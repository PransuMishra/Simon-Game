
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []; 

var userClickPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level" + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChoosenColour = $(this).attr("id");
    userClickPattern.push(userChoosenColour);
    
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickPattern.length-1);
})

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
        console.log("success");

        if(userClickPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

        
    }else{

        console.log("wrong");

        playSound("wrong");
        $("body").addClass("Game-Over");
        setTimeout(function(){
            $("body").removeClass("Game-Over")
        },200)
        
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }



}
function nextSequence(){

    userClickPattern = [];

    level++;
    $("#level-title").text("level : " + level);


    var randomNumber = Math.floor(Math.random() * 4);


    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();
}

function animatePress (currentColour){

    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}