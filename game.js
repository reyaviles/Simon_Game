var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$("body").keydown(function(){
  if (level===0) {
    $("#level-title").html("Level " + level);
    nextSequence();
  }
});

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequence(){
  level++;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var tempAudio = new Audio("sounds/"+ name + ".mp3");
  tempAudio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
  $("."+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      userClickedPattern = [];
      setTimeout(function() {

        nextSequence();
      }, 1000);
    }
  }else {

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },500);
      playSound("wrong");
      startOver();
      $("#level-title").html("Game Over (Press any key to restart)");
  }
}

function startOver(){
  level = 0;
  gamePattern =[];
  userClickedPattern =[];
}
