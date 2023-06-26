let buttonColours=["red","blue","green","yellow"];
let gamePattern= [];
let userClickedPattern=[] 
let level=0;
let toggle=false;
let randomChosenColour="";
let level_Head = document.querySelector("#level-title")
let timeG=1000
document.addEventListener("keydown",function(){
    if(toggle!=true)
    {
        setTimeout(function (){
            nextSequence()
        },100)
        
    }
    toggle=true;
})


function nextSequence()
{
    userClickedPattern.length=0;
    let randNo=Math.floor(Math.random()*4)
    randomChosenColour=buttonColours[randNo];
    gamePattern.push(randomChosenColour)

    $("#"+randomChosenColour).fadeOut(1).fadeIn();
    makeSound(randomChosenColour)
    level_Head.textContent="Level "+ level
    ++level;
    
    if(timeG>1)
            timeG=timeG-level*5;
}

function makeSound(sound)
{
    switch (sound) {
        case "red":
            var audio1=new Audio(`sounds/red.mp3`);
            audio1.play();
            break;
        case "blue":
            var audio2=new Audio(`sounds/blue.mp3`);
            audio2.play();
            break;
        case "green":
            var audio3=new Audio(`sounds/green.mp3`);
            audio3.play();
            break;
        case "yellow":
            var audio4=new Audio(`sounds/yellow.mp3`);
            audio4.play();
            break;
        default:
            var audioW=new Audio(`sounds/wrong.mp3`);
            audioW.play();
            break;
    }
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function (){
        $("#"+currentColour).removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel)
{
    console.log("NEW") 
   for(let i=0;i<=currentLevel;i++)
   {
        console.log(i)
        if(userClickedPattern[i]==gamePattern[i])
        {          
            toggle=true;     
        }
        else
        {
            toggle=false
           gameOver()
            return false
        }    
    }
 return toggle
}

function gameOver()
{
    level_Head.textContent="Game Over, Press Any Key to Restart"
    $("body").addClass("game-over")
    makeSound("default")
    level=0;
    userClickedPattern.length=0;
    gamePattern.length=0;
    toggle=false;
    startOver()
}

function startOver()
{
    timeG=1000
    document.addEventListener("keydown",function(){
        $("body").removeClass("game-over")
        if(toggle!=true)
        {   
            setTimeout(function (){
                nextSequence()
            },1000)
        }
        toggle=true;
    })   
}

$(".btn").click(function() { 
    let userChosenColour=this.id;
    userClickedPattern.push(userChosenColour)
    makeSound(userChosenColour)
    animatePress(userChosenColour)
   let some=userClickedPattern.length;
    if(some==level||some==0)
    {
        let check =  checkAnswer(level-1)
        if(check==true)
        {
            setTimeout(function (){
            nextSequence();
            },timeG);
        
        }  
    }
});