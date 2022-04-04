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
                framesMax: 8,
                image: new Image()
            }   
    },
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
        x: -50,
        y: 0
    },

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
    player.update();
    //enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;
    //player movement
    if(keys.a.pressed && keys.d.pressed){
        player.velocity.x = 0;
    }
    else if(keys.a.pressed) {
        player.velocity.x = -5;
    }
    else if( keys.d.pressed){
        player.velocity.x = 5;
    }
    //enemy movement
    if(keys.ArrowLeft.pressed && keys.ArrowRight.pressed){
        enemy.velocity.x = 0;
    }
    else if(keys.ArrowLeft.pressed) {
        enemy.velocity.x = -5;
    }
    else if( keys.ArrowRight.pressed){
        enemy.velocity.x = 5;
    }

    //detect for colision
    if( rectangularCollision({ rectangle1: player, rectangle2: enemy }) &&  player.isAttacking) {
        player.isAttacking = false;
        enemy.health -= 20;
        document.querySelector("#enemyHealth").style.width = enemy.health + '%';

    }
    //enemy colision
    if( rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&  enemy.isAttacking) {
        enemy.isAttacking = false;
        player.health -= 20;
        document.querySelector("#playerHealth").style.width = player.health + '%';

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

    console.log(event.key);
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
