var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern =[];
var userClickedPattern = [];


var started = false;
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {


    if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});



$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);  
});

function checkAnswer(currentlevel){


        if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {    
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function() {
                nextSequence();

                },1000);
            } 

        }   else {

            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
        
            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            startOver();
        

        }   
}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level" + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColour  = buttonColors[randomNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");

    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}



function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }





