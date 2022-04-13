
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

function keyDownEvents({player, enemy}) {
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
                if(player.velocity.y === 0)
                    player.velocity.y = -player.jumpHeight;
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
                if(enemy.velocity.y === 0)
                    enemy.velocity.y = -enemy.jumpHeight;
                break;
            case "ArrowDown":
                enemy.isAttacking = true;
                enemy.atack();
                break;
            }
        }
    })
}

function keyUpEvents() {
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
}    