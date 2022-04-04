class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0} }) {
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
    }
    animateFrames() {
        this.framesElapsed++;

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
        imageSrc,
        scale = 1,
        framesMax = 1,
        sprites
    }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.sprites = sprites

        for( const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src =  sprites[sprite].imageSrc
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
            offset,
            widht: 100,
            height: 50,
        }
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
    }
    update() {
        this.draw();
        this.animateFrames()

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;

        this.position.y += this.velocity.y; 
        this.position.x += this.velocity.x;

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96 ) {
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