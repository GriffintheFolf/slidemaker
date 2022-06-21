/*
    slidemaker - canvas rendering
    licenced under the MIT Licence
*/

// video FPS, DO NOT CHANGE!
const FRAMES_PER_SECOND = 5;

// ctx.textBaseline must be set to "bottom" for this to work
function text_height(ctx, text) {
    let metrics = ctx.measureText(text);
    return metrics.actualBoundingBoxAscent;
}

function draw_text() {
    let width = parseInt(document.getElementById("slidewidth").value);
    let height = parseInt(document.getElementById("slideheight").value);

    if (!width || width < 1 || !height || height < 1) return;

    let canvas = document.getElementById("preview");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    let ctx = canvas.getContext("2d");
    ctx.save();

    let bgcolour = document.getElementById("bgcolour").value;
    let textcolour = document.getElementById("textcolour").value;
    let text = document.getElementById("textinput").value;

    let offset = 0.0;

    ctx.fillStyle = bgcolour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "bottom";

    //var offset = 0.0;
    console.log("Offset: " + offset);
    let lines = text.split("\n");

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
        //offset = offset - text_height(ctx, lines[i]);
        ctx.fillText(lines[i], canvas.width/2, (canvas.height/2 - offset), canvas.width);
        offset = offset - text_height(ctx, lines[i]);
        console.log("Offset: " + offset);
    }

    encode_video();
    ctx.restore();
}

function encode_video() {
    let canvas = document.getElementById("preview");
    let slide_length = document.getElementById("slidelength").value;
    let frames = [];

    for(let i = 0; i < (slide_length * FRAMES_PER_SECOND + 1); i++) {
        frames.push(canvas.toDataURL("image/webp"));
    }

    let output = index.fromImageArray(frames, FRAMES_PER_SECOND, false);
    document.getElementById("result").src = URL.createObjectURL(output);
}
