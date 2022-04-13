let gameMode = 1;
gameMode = localStorage.getItem("gameMode");
console.log(gameMode);

let playerSpeed = 20 * gameMode;
let enemySpeed = 20 * gameMode;

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = document.getElementById("canvas_container").offsetWidth
canvas.height = document.getElementById("canvas_container").offsetHeight

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7 * gameMode;

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
        x:0,
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
    attackDamage: 15 * gameMode,
    jumpHeight: 15 * gameMode
})

const enemy = new Fighter({
    position:
    {
        x:400,
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
    attackDamage: 5 * gameMode,
    jumpHeight: 20 * gameMode
})

decreaseTimer();

function animate(){
    window.requestAnimationFrame(animate);
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
        console.log(player.attackDamage)
        enemy.takeHit(player.attackDamage)

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
        player.takeHit(enemy.attackDamage)

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
        determineWinner({player, enemy, timerId});
    }

    if( playerCollision({ rectangle1: player, rectangle2: enemy }) || playerCollision({ rectangle1: enemy, rectangle2: player }) ) {
        console.log("Player collision")
    }
}

function changeMode(mode) {
    console.log("Huadwhuaw")
    switch(mode){
        case 'slow': 
            localStorage.setItem("gameMode", 0.6);
            break;
        case 'normal':
            localStorage.setItem("gameMode", 1);
            break;
        case 'fast':
            localStorage.setItem("gameMode", 2);
            break;
    }
}
//controls
keyDownEvents({player, enemy});
keyUpEvents();

animate();
