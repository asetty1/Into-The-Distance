class Tree extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super (scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setScale(0.5)

        this.body.setSize(this.width/4.5, this.height/1.7)
        this.body.setOffset(this.width / 2.5, this.height / 4)

        this.body.setImmovable(true)

        this.points = pointValue
        this.movespeed = treeSpeed
    }

    update() {
        if (canControl) {
            this.movespeed = treeSpeed
            this.y += this.movespeed

            if (this.y > this.scene.scale.height + this.y/2) {
                this.setActive(false)
                this.setVisible(false)
                this.resetPosition()
            }
        }
    }

    resetPosition() {
        this.y = -this.y/2
        this.x = Phaser.Math.Between(0, this.scene.scale.width)
    }

    
      
}