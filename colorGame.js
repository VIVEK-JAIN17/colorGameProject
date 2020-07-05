var current = $(".active");
var buttons = $(".mode");
var $replay = $(".new");
var mode = "hard";
var tiles = $(".square");
var $ans = $("span.space");
var pickedColor;
var colors = [];

playGame(mode);

$(buttons).click(function () {

    if ($(this).hasClass("active")) {
        console.log("mode is unchanged. Time to return");
        return;
    }
    $(this).addClass("active");
    $(current).removeClass("active");
    current = $(this);
    mode = this.id;
    console.log(mode);
    playGame(mode);
});

$replay.click(function () {
    playGame(mode);
});

function playGame(mode) {

    reset();

    colors = generateRandomColors(mode);

    pickedColor = pickColor(colors);
    $("#selectedColor").text(pickedColor);
    let i = 0;
    for (i = 0; i < colors.length; i++) {
        $(tiles[i]).css({
            backgroundColor: colors[i]
        });

        console.log("assigning bg colors");
    }

    if (mode === "easy") {
        console.log("entered easy mode")
        for (let j = 3; j < tiles.length; j++) {
            $(tiles[j]).fadeOut();
        }
    }
    
    if (mode === "hard") {
        console.log("entered hard mode")
        for (let j = 3; j < tiles.length; j++) {
            $(tiles[j]).fadeIn();
        }
    }

    
}

$(tiles).click(function () {
    var bg = this.style.backgroundColor;
    console.log(bg);
    if (bg === pickedColor) {
        $ans.text("Correct Answer !");
        $replay.text("Play Again ?");
        $(tiles).css({
            backgroundColor: pickedColor
        });
        $("header").css({
            backgroundColor: pickedColor
        });

    } else {
        $(this).css({
            backgroundColor: "#222"
        });
        $ans.text("Try Again");
    }
});

function reset() {

    // For every new Game, reset to default settings
    $ans.text("");

    $("header").css({
        backgroundColor: "#256497"
    });

    $replay.text("New Colors");

}

function pickColor(colors) {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(mode) {

    var l = (mode === "hard") ? 6 : 3;

    colors = [];
    for (let i = 0; i < l; i++) {
        let color = randomColor();
        colors.push(color);
    }

    return colors;
}

function randomColor() {

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let a = Math.random() + 0.5;
    a = a.toFixed(1);

    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}