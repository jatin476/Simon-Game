var level = 0;
var starded = false ;

var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"] ;

$(document).keypress(function(event){
    if(!starded){
        $("h1").text("Level " + level);
        nextSequence();
        starded = true;
    } 
})

$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playsound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence(); 
            } ,1000);
            
        }

    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass('game-over');
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart ")
        startOver();


    }
    
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);

    var randomNumber = Math.round(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playsound(randomChosenColour);
    
    
}


function playsound(name) {
    $("#"+name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var sound = new Audio("sounds/"+ name+".mp3");
    sound.play();   
}

function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass('pressed');
    }, 100);
    
}

function startOver() {
    gamePattern = [];
    level = 0 ;
    starded = false;
    
}






