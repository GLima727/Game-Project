let gameMode = 1;
localStorage.setItem("gameMode", gameMode);

localStorage.setItem("leftScore", 0);
localStorage.setItem("rightScore", 0);

gameMode = localStorage.getItem("gameMode");
console.log(gameMode);

let playerSpeed = 20 * gameMode;
let enemySpeed = 20 * gameMode;

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = document.getElementById("canvas_container").offsetWidth
canvas.height = document.getElementById("canvas_container").offsetHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7;

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: "./img/background.png"
})

const shop = new Sprite({
    position: {
        x:600,
        y:128
    },
    imageSrc: "./img/shop.png",
    scale: 2.75,
    framesMax: 6,
    frameSpeed: 2
})

const player = new Fighter({
    position:
    {
        x:50,
        y:0
    },
    velocity:
    {
        x:0,
        y:0
    },
    offset: {
        x: 225,
        y: 157
    },

    sprites: {
        idle: { imageSrc: "./img/samuraiMack/Idle.png",
                framesMax: 8
                },
        run: { imageSrc: "./img/samuraiMack/Run.png",
                framesMax: 8
            },  
        jump: { imageSrc: "./img/samuraiMack/Jump.png",
                framesMax: 2
        },
        fall: { imageSrc: "./img/samuraiMack/Fall.png",
        framesMax: 2
        },
        attack1: { imageSrc: "./img/samuraiMack/Attack1.png",
        framesMax: 6
        },
        takeHit: { imageSrc: "./img/samuraiMack/Take Hit - white silhouette.png",
                    framesMax: 4
        },
        death: { imageSrc: "./img/samuraiMack/Death.png",
                    framesMax: 6
        }
        },
        attackBox: {
            offset: {
                x: 80,
                y: -20
            },
            widht: 170,
            height: 120
        },
    frameSpeed: 3,
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    attackDamage: 15,
    jumpHeight: 15 * gameMode
})

const enemy = new Fighter({
    position:
    {
        x:900,
        y:100
    },
    velocity:
    {
        x:0,
        y:0
    },
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: { imageSrc: "./img/kenji/Idle.png",
                framesMax: 4
                },
        run: { imageSrc: "./img/kenji/Run.png",
                framesMax: 8
            },  
        jump: { imageSrc: "./img/kenji/Jump.png",
                framesMax: 2
        },
        fall: { imageSrc: "./img/kenji/Fall.png",
        framesMax: 2
        },
        attack1: { imageSrc: "./img/kenji/Attack1.png",
        framesMax: 4
        },
        takeHit: { imageSrc: "./img/kenji/Take Hit.png",
                    framesMax: 3
        },
        death: { imageSrc: "./img/kenji/Death.png",
                    framesMax: 7
        }
        },
        attackBox: {
            offset: {
                x: -160,
                y: 20
            },
            widht: 180,
            height: 100
        },
        frameSpeed: 4,
    imageSrc: './img/kenji/Idle.png',
    framesMax: 5,
    scale: 2.5,
    attackDamage: 8,
    jumpHeight: 20 * gameMode
})
let roundEnd = false

function animate(){
    window.requestAnimationFrame(animate);
    console.log(player.dead)
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    //draw sprites
    background.update();
    shop.update();

    //white overlay with low opacity
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if(keys.a.pressed && keys.d.pressed){
        player.velocity.x = 0;
    }
    else if(keys.a.pressed) {
        player.velocity.x = -playerSpeed;
        player.switchSprite("run")
    }
    else if( keys.d.pressed){
        player.velocity.x = playerSpeed;
        player.switchSprite("run")
    }
    else {
        player.switchSprite("idle")
    }

    //jumping
    if(player.velocity.y < 0) { //player is in the air
        player.switchSprite("jump")
    } else if(player.velocity.y > 0){
        player.switchSprite("fall")
    }

    //enemy movement
    if(keys.ArrowLeft.pressed && keys.ArrowRight.pressed){
        enemy.velocity.x = 0;
    }
    else if(keys.ArrowLeft.pressed) {
        enemy.velocity.x = -enemySpeed;
        enemy.switchSprite("run")
    }
    else if( keys.ArrowRight.pressed){
        enemy.velocity.x = enemySpeed;
        enemy.switchSprite("run")
    }
    else {
        enemy.switchSprite("idle")
    }
    // jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall')
    }

    //detect for colision & enemy gets hit
    if( rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&  player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
        console.log(enemyInvicibilityTimer)
        if(enemyInvicibilityTimer === 0){
            enemy.takeHit(player.attackDamage)
            changeInvicibilityTime("enemy", 1);
        }

        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
        
    }

    //if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    //enemy colision and player gets hit
    if( rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&  enemy.isAttacking && enemy.framesCurrent === 2) {

        enemy.isAttacking = false;

        if(playerInvicibilityTimer === 0) {
            player.takeHit(enemy.attackDamage)
            changeInvicibilityTime("player", 1);

            }

        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }
    //if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }
    
    //end game based on health
    if( enemy.health <= 0 || player.health <= 0) {
        if(!roundEnd){
            determineWinner({player, enemy, timerId});
            roundEnd = true
            setTimeout(restartGame, 5000);
        }
        
    }

    if( playerCollision({ rectangle1: player, rectangle2: enemy }) || playerCollision({ rectangle1: enemy, rectangle2: player }) ) {
        console.log("Player collision")
    }
}

function changeMode(mode) {
    console.log("Huadwhuaw")
    switch(mode){
        case 'slow':
            document.getElementById("slowSpeedButton").style.backgroundColor = "#cc7401"; 
            document.getElementById("normalSpeedButton").style.backgroundColor = "#d6eaec"; 
            document.getElementById("fastSpeedButton").style.backgroundColor = "#d6eaec"; 
            localStorage.setItem("gameMode", 0.6);
            break;
        case 'normal':
            document.getElementById("slowSpeedButton").style.backgroundColor = "#d6eaec"; 
            document.getElementById("normalSpeedButton").style.backgroundColor = "#cc7401"; 
            document.getElementById("fastSpeedButton").style.backgroundColor = "#d6eaec"; 
            localStorage.setItem("gameMode", 1);
            break;
        case 'fast':
            document.getElementById("slowSpeedButton").style.backgroundColor = "#d6eaec"; 
            document.getElementById("normalSpeedButton").style.backgroundColor = "#d6eaec"; 
            document.getElementById("fastSpeedButton").style.backgroundColor = "#cc7401"; 
            localStorage.setItem("gameMode", 2);
            break;
    }
}
//controls
function startGame() {
    resetTimer(10);
    decreaseTimer();
    keyDownEvents({player, enemy});
    keyUpEvents();
    animate();
    
}

function resetHealth() {
    player.resetHealth();
    enemy.resetHealth();
    gsap.to('#enemyHealth', {
        width: enemy.health + '%'
    })

    gsap.to('#playerHealth', {
        width: player.health + '%'
    })
}
function resetPositions() {
    player.position.x = 50;
    player.position.y = 0;
    enemy.position.x = 900;
    enemy.position.y = 100;

    if(player.dead) {
        player.dead = false;
        player.image = player.sprites.idle.image
        player.switchSprite("idle")
    }
    else if(enemy.dead) {
        enemy.dead = false;
        enemy.image = enemy.sprites.idle.image
        enemy.switchSprite("idle")
    }
}
function restartGame() {

    resetHealth();
    roundEnd = false
    resetPositions();

    document.querySelector("#displayText").innerHTML = "";
    resetTimer(50);
    decreaseTimer();

}
function restart() {

    localStorage.setItem("leftScore", 0);
    localStorage.setItem("rightScore", 0);
    document.querySelector("#leftScore").innerHTML = 0;
    document.querySelector("#rightScore").innerHTML = 0;
    restartGame();
}
console.log("startgame")
startGame();