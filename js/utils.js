
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
let timerId 
function decreaseTimer(){

    if(timer > 0) {  

        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;

    }   
    if(timer === 0) {
        determineWinner({player, enemy, timerId});
    }
}