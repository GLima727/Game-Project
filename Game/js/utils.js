
function playerCollision({rectangle1, rectangle2}) {
    return (
        (rectangle1.position.x + rectangle1.widht >= rectangle2.position.x && 
        rectangle1.position.x + rectangle1.widht <= rectangle2.position.x + rectangle2.widght ||
        rectangle1.position.x >= rectangle2.position.x && 
        rectangle1.position.x <= rectangle2.position.x + rectangle2.widght) &&

        (rectangle1.position.y + rectangle1.height >= rectangle2.position.y && 
        rectangle1.position.y + rectangle1.height <= rectangle2.position.y + rectangle2.height ||
        rectangle1.position.y >= rectangle2.position.y && 
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height) 
    )
}
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.widht >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.widght &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId);
    document.querySelector("#displayText").style.display = "flex";
    if( player.health === enemy.health) {
        document.querySelector("#displayText").innerHTML = "TIE";
        }
    else if(player.health > enemy.health) {
        document.querySelector("#displayText").innerHTML = "PLAYER WINS";
        }
    else if(player.health < enemy.health) {
        document.querySelector("#displayText").innerHTML = "ENEMY WINS";
        }
}
let timer = 60
let enemyInvicibilityTimer = 0
let playerInvicibilityTimer = 0

let enemyInvicibilityTimerId 
let playerInvicibilityTimerId 
let timerId 

function changeInvicibilityTime(fighter, time) {
    if(fighter === "enemy"){
        enemyInvicibilityTimer = time
    }
    else if(fighter === "player") {
        playerInvicibilityTimer = time
    }
}

function decreaseTimer(){

    console.log(enemyInvicibilityTimer)
    console.log(playerInvicibilityTimer)
    if(timer > 0) {  

        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;

    }   
    if(timer === 0) {
        determineWinner({player, enemy, timerId});
    }

    //repeated code i dont fucking know why it works like this it makes no sense

    if(enemyInvicibilityTimer > 0) {  

        enemyInvicibilityTimerId  = setTimeout(decreaseInvicibilityTimer, 500);
        enemyInvicibilityTimer--;

    }   
    if(enemyInvicibilityTimer === 0) {
       clearTimeout(enemyInvicibilityTimerId);
    }

    if(playerInvicibilityTimer > 0) {  

        playerInvicibilityTimerId  = setTimeout(decreaseInvicibilityTimer, 500);
        playerInvicibilityTimer--;

    }   
    if(playerInvicibilityTimer === 0) {
       clearTimeout(playerInvicibilityTimerId);
    }

}
function decreaseInvicibilityTimer() {
    console.log(enemyInvicibilityTimer)
    console.log(playerInvicibilityTimer)
    if(enemyInvicibilityTimer > 0) {  

        enemyInvicibilityTimerId  = setTimeout(decreaseInvicibilityTimer, 500);
        enemyInvicibilityTimer--;

    }   
    if(enemyInvicibilityTimer === 0) {
       clearTimeout(enemyInvicibilityTimerId);
    }

    if(playerInvicibilityTimer > 0) {  

        playerInvicibilityTimerId  = setTimeout(decreaseInvicibilityTimer, 500);
        playerInvicibilityTimer--;

    }   
    if(playerInvicibilityTimer === 0) {
       clearTimeout(playerInvicibilityTimerId);
    }


}