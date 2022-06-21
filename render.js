/*
    slidemaker - canvas rendering
    licenced under the MIT Licence
*/

// video FPS, DO NOT CHANGE!
const FRAMES_PER_SECOND = 5;

// ctx.textBaseline must be set to "bottom" for this to work
function text_height(ctx, text) {
    const metrics = ctx.measureText(text);

    /*
        TextMetrics.fontBoundingBoxAscent is more accurate for positioning text
        but is not enabled by default in Firefox, despite having been present
        since Firefox 74.

        Use fontBoundingBoxAscent if the browser supports it, otherwise fall
        back to actualBoundingBoxAscent.

        https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics/fontBoundingBoxAscent
    */
    if("fontBoundingBoxAscent" in metrics) {
        console.log("Using TextMetrics.fontBoundingBoxAscent");
        return metrics.fontBoundingBoxAscent;
    }

    console.log("Warning: TextMetrics.fontBoundingBoxAscent unsupported!");
    return metrics.actualBoundingBoxAscent;
}

function draw_text() {
    const width = parseInt(document.getElementById("slidewidth").value);
    const height = parseInt(document.getElementById("slideheight").value);

    if (!width || width < 1 || !height || height < 1) return;

    const canvas = document.getElementById("preview");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    const ctx = canvas.getContext("2d");
    ctx.save();

    const bgcolour = document.getElementById("bgcolour").value;
    const textcolour = document.getElementById("textcolour").value;
    const text = document.getElementById("textinput").value;

    let offset = 0.0;

    ctx.fillStyle = bgcolour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "bottom";

    console.log("Offset: " + offset);
    const lines = text.split("\n");

    // calculate initial y offset for text
    for(let i = 0; i < lines.length; i++) {
        console.log("Line " + i + " height: " + text_height(ctx, lines[i]));
        offset = offset + text_height(ctx, lines[i]);
    }
    console.log("Initial offset: " + offset);

    ctx.font = "30px sans-serif";
    ctx.fillStyle = textcolour;
    ctx.textAlign = "center";

    for(let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], canvas.width/2, (canvas.height/2 - offset), canvas.width);
        offset = offset - text_height(ctx, lines[i]);
        console.log("Offset: " + offset);
    }

    encode_video();
    ctx.restore();
}

function encode_video() {
    const canvas = document.getElementById("preview");
    const slide_length = document.getElementById("slidelength").value;
    const frames = [];

    const image = canvas.toDataURL("image/webp");

    for(let i = 0; i < (slide_length * FRAMES_PER_SECOND + 1); i++) {
        frames.push(image);
    }

    const output = index.fromImageArray(frames, FRAMES_PER_SECOND, false);
    document.getElementById("result").src = URL.createObjectURL(output);
}
