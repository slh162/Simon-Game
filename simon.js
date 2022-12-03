let buttonColors = ["red", "green", "blue", "yellow"];
let gamePatterns = [];
let userClickedPattern = [];
// determines if the game is started or not
let started = false;
let level = 0;
//
function smartPhone() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequance();
    started = true;
  }
}
// listens to key presses
$(document).keypress(function () {
  // shows level when started
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequance();
    started = true;
  }
});
// listens to button clicks
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playAudio(userChosenColour);
  animatedPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
//
function checkAnswer(currentLevel) {
  if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePatterns.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequance();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playAudio("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}
//
function nextSequance() {
  userClickedPattern = [];
  level++;
  // change h1 to level number
  $("#level-title").text("level " + level);
  // randomizes number to choose random button
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePatterns.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(randomChosenColor);
  animatedPress(randomChosenColor);
}

//fetchs audio to play
function playAudio(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//adds animation to button presses
function animatedPress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//
function startOver() {
  level = 0;
  gamePatterns = [];
  started = false;
}
