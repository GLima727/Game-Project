const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const gravity = 0.7;
c.fillRect(0, 0, canvas.width, canvas.height)


class Sprite {
    constructor({ position, velocity, color = "red", offset }) {
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.widght = 50;
        this.lastKey = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            widht: 100,
            height: 50,
        }
        this.color = color;
        this.isAttacking = false;
    }
    draw() {
        
        //player
        c.fillStyle = this.color;
        c.fillRect(
            this.position.x,
            this.position.y,
            this.widght,
            this.height);
            
        //atackbox
        if(this.isAttacking) {
            c.fillStyle = "green";
            c.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.widht,
                this.attackBox.height);
        }
    }
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height ) {
            this.velocity.y = 0;
        } else this.velocity.y += gravity;
    }
    atack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
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
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
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
    color: "blue"
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

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.widht >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.widght &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}
function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
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
        console.log("go")
    }
    //enemy colision
    if( rectangularCollision({ rectangle1: enemy, rectangle2: player }) &&  enemy.isAttacking) {
        enemy.isAttacking = false;
        console.log("goat")
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
