const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

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
    framesMax: 6
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
        x: 125,
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
                x: 180,
                y: 50
            },
            widht: 160,
            height: 50
        },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
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
                x: -235,
                y: 50
            },
            widht: 100,
            height: 50
        },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.5,
})

enemy.draw();

const  keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    w: {
        pressed: false
    },
    Space: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },

    ArrowUp: {
        pressed: false
    }


}
let lastKey

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
        player.velocity.x = -5;
        player.switchSprite("run")
    }
    else if( keys.d.pressed){
        player.velocity.x = 5;
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
        enemy.velocity.x = -5;
        enemy.switchSprite("run")
    }
    else if( keys.ArrowRight.pressed){
        enemy.velocity.x = 5;
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
        enemy.takeHit()
        player.isAttacking = false;

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
        player.takeHit()
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

window.addEventListener("keydown", (event) =>{
    if(!player.dead){

    switch(event.key){
        case 'd': 
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;

        case 'a': 
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;

        case 'w': 
            keys.w.pressed = true;
            player.lastKey = 'w';
            player.velocity.y = -20;
            break;

        case ' ': 
            keys.Space.pressed = true;
            player.lastKey = 'Space';
            player.atack();
            break;
        } 
    }       
    if(!enemy.dead){
            
    switch(event.key){

     //enemy keys
        case 'ArrowRight': 
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
        break;

        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;

        case "ArrowUp":
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            enemy.velocity.y = -20;
            break;
        case "ArrowDown":
            enemy.isAttacking = true;
            enemy.atack();
            break;
        }
    }
})

window.addEventListener("keyup", (event) =>{
    switch(event.key){
        case 'd': 
            keys.d.pressed = false;
            break;

        case 'a': 
            keys.a.pressed = false;
            break;
    }
    //enemy keys
    switch(event.key){
        case 'ArrowRight': 
            keys.ArrowRight.pressed = false;
            break;

        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false;
            break;
    }

    console.log(event.key);
})

animate();
