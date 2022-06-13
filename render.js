/*
    slidemaker - canvas rendering
    licenced under the MIT Licence
*/

// video FPS, DO NOT CHANGE!
const FRAMES_PER_SECOND = 5;

// video codec
const VIDEO_CODEC = "video/webm; codecs=\"vp8\"";

// ctx.textBaseline must be set to "bottom" for this to work
function text_height(ctx, text) {
    let metrics = ctx.measureText(text);
    return metrics.actualBoundingBoxAscent;
}

function draw_text() {
    let canvas = document.getElementById("preview");
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
    let ctx = document.getElementById("preview").getContext("2d");
    let slide_length = document.getElementById("slidelength").value;
    let encoder = new Whammy.Video(FRAMES_PER_SECOND);

    for(let i = 0; i < (slide_length * FRAMES_PER_SECOND + 1); i++) {
        encoder.add(ctx);
    }

    let output = encoder.compile(false, function(output) {
        let mediasource = new MediaSource();
        let url = URL.createObjectURL(mediasource);
        document.getElementById("result").src = url;

        let buffer = null;
        mediasource.addEventListener("sourceopen", function() {
            buffer = mediasource.addSourceBuffer(VIDEO_CODEC);
            mediasource.addEventListener("updateend", function() {
                buffer.appendBuffer(output);
            });
        });

        //document.getElementById("result").src = url;
    });
}
