class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}, frameSpeed}) {
        this.position = position;
        this.height = 150;
        this.widght = 50;
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
        this.frameSpeed = frameSpeed
    }
    animateFrames() {
        this.framesElapsed += this.frameSpeed;

        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent + 1 < this.framesMax ) {
                this.framesCurrent++
            }
            else {
                this.framesCurrent = 0;
            }
       }
    }
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height ,

            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale)
        }
    update() {
        this.draw();
        this.animateFrames()
    }

}

class Fighter extends Sprite{
    constructor({ 
        position,
        velocity,
        color = "red",
        offset = {x:0, y:0},
        imageSrc  = "./img/samuraiMack/Idle.png",
        scale = 1,
        framesMax = 1,
        sprites,
        attackBox = { offset: {}, widht: undefined, height: undefined },
        attackDamage = 10,
        jumpHeight,
        frameSpeed,
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            frameSpeed
        })
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        this.velocity = velocity;
        this.height = 150;
        this.widght = 50;
        this.lastKey = '';
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            widht: attackBox.widht,
            height: attackBox.height,
        }
        this.jumpHeight = jumpHeight
        this.attackDamage = attackDamage
        this.color = color;
        this.isAttacking
        this.health = 100;
    }
    update() {

        this.draw();

        if(!this.dead)
            this.animateFrames()

        //attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        //draw atackbox
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.widht, this.attackBox.height)
        //draw player Hitbox
        //c.fillRect(this.position.x,this.position.y, this.widght, this.height)

        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        //vertical collision on the ground
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96 ) {
            this.velocity.y = 0;
            this.position.y = 330;
        } else this.velocity.y += gravity;
        if(this.position.y + this.height + this.velocity.y <= 0){
            this.velocity.y = 10;

        }
        let leftBorder = 10
        //canvas width minus bordersize
        let rightBorder = document.getElementById("canvas_container").offsetWidth - 50
        //horizontal collision on the border
        if (this.position.x  + this.velocity.x <= leftBorder ) {
            this.velocity.x = 0;
            this.position.x = leftBorder ;
        }
        else if(this.position.x  + this.velocity.x >= rightBorder ){
            this.velocity.x = 0;
            this.position.x = rightBorder ;
        }

    }
    atack() {
        this.switchSprite("attack1")
        this.isAttacking = true;


    }

    takeHit( damage) {

        this.health -= damage
        if(this.health <= 0) {
            this.switchSprite("death")

        } else {
            this.switchSprite("takeHit")
        }
    }

    switchSprite(sprite) {
        //overrides all animations
        if(this.image === this.sprites.death.image){
            // when it gets to the last frame
            if(this.framesCurrent === this.sprites.death.framesMax - 1) {
                this.dead = true
            }
            return
        }

        if(sprite != "death") { //only focus on atack animation if they are not dead
            if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return
            if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return 
        }

        switch (sprite) {
            case "idle": 

                if(this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if(this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if(this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0;
                }
                break;  
            case 'fall':
                if(this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0;
                }
                break;  
            case 'attack1':
                if(this.image !== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image
                    this.framesMax = this.sprites.attack1.framesMax
                    this.framesCurrent = 0;
                }
                break;  
            case "takeHit":
                if(this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0;
                }
                break;  
            case "death":
                if(this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0;
                    this.switchSprite("death")
                }
                break;  
        }
    }
}