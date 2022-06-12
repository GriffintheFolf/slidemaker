/*
    slidemaker - canvas rendering
    licenced under the MIT Licence
*/

// video FPS, DO NOT CHANGE!
const FRAMES_PER_SECOND = 5;

// ctx.textBaseline must be set to "bottom" for this to work
function text_height(ctx, text) {
    var metrics = ctx.measureText(text);
    return metrics.fontBoundingBoxAscent;
}

function draw_text() {
    var canvas = document.getElementById("preview");
    var ctx = canvas.getContext("2d");
    var bgcolour = document.getElementById("bgcolour").value;
    var textcolour = document.getElementById("textcolour").value;
    var text = document.getElementById("textinput").value;

    ctx.fillStyle = bgcolour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textBaseline = "bottom";

    var offset = 0.0;
    var lines = text.split("\n");

    // calculate initial y offset for text
    for(var i = 0; i < lines.length; i++) {
        offset = offset + text_height(ctx, lines[i]);
    }

    ctx.font = "30px sans-serif";
    ctx.fillStyle = textcolour;
    ctx.textAlign = "center";

    for(var i = 0; i < lines.length; i++) {
        offset = offset - text_height(ctx, lines[i]);
        ctx.fillText(lines[i], canvas.width/2, (canvas.height/2 - offset), canvas.width);
    }

    encode_video();
}

function encode_video() {
    var ctx = document.getElementById("preview").getContext("2d");
    var slide_length = document.getElementById("slidelength").value;
    var encoder = new Whammy.Video(FRAMES_PER_SECOND);

    for(let i = 0; i < (slide_length * FRAMES_PER_SECOND + 1); i++) {
        encoder.add(ctx);
    }

    var output = encoder.compile(false, function(output) {
        document.getElementById("result").src = URL.createObjectURL(output);
    });
}
