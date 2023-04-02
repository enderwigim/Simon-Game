
var buttonColors = ["red", "blue", "green", "yellow"]

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;
function nextSecuence() {
    userClickedPattern = [];
    // Select a number from 0 to 3
    var randomNumber = Math.round(Math.random() * 3);
    // Select a color
    var randomChosenColor = buttonColors[randomNumber];
    // Add it to the secuence
    gamePattern.push(randomChosenColor);
    

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    level++
    $("h1").text("Level " + level)
}

// Check if button was clicked
$(".btn").click(function() {
    // Get what color the user chose
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// This will help us to start the game.
$(document).keydown(function(){
    if (!started) {
        nextSecuence();
        started = true;
        
    }
    console.log(event.key)
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
        
    }, 100)
}

function checkAnswer(currentLevel) {
    if (userClickedPattern.length === gamePattern.length){
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            setTimeout(nextSecuence, 1000);
          } else {
            gameOver();
        }
    } else {
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
          } else {
            gameOver();
        }
    }
    
}

function gameOver(){
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 200);
  startOver();
  
}

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}