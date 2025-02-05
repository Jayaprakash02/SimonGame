
var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = 1;
var level=0;

$(document).keypress(function(){
    if(started != 0){
        $("#level-title").text("level"+level);
        nextSequence();
        started = 0;
    }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

  

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random() * 4);  
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
}
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER - Press Any Key To RESTART");
        setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
        startOver();
    }
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = 1;
  }
  