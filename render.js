/*
    slidemaker - canvas rendering
    licenced under the MIT Licence
*/

// video FPS, DO NOT CHANGE!
const FRAMES_PER_SECOND = 5;

function draw_text() {
    var canvas = document.getElementById("preview");
    var ctx = canvas.getContext("2d");
    var bgcolour = document.getElementById("bgcolour").value;
    var textcolour = document.getElementById("textcolour").value;
    var text = document.getElementById("textinput").value;

    ctx.fillStyle = bgcolour;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = "30px sans-serif";
    ctx.fillStyle = textcolour;
    console.log("Text colour: " + ctx.fillStyle);
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width/2, canvas.height/2, canvas.width);
}

function encode_video(canvas, slide_length) {
    var encoder = new Whammy.Video(FRAMES_PER_SECOND);

    for(let i = 0; i < (slide_length * FRAMES_PER_SECOND); i++) {
        encoder.add(canvas);
    }
}
