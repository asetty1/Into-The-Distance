class Horse extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // Call Sprite parent class
        scene.add.existing(this)           // Add Horse to the existing scene
        scene.physics.add.existing(this)   // Add physics body to the scene

        this.body.setSize(this.width / 2, this.height / 1.5)
        this.body.setOffset(this.width / 4, this.height / 4 - 40)

        this.body.setCollideWorldBounds(true)

        //this.body.checkCollision.right = false
        //this.body.checkCollision.left = false

        // Set custom Horse properties
        this.horseVelocity = horseVelo
        this.bottomBoundary = scene.scale.height
        
        this.setScale(0.2)

        // Create controls
        this.cursors = scene.input.keyboard.createCursorKeys()

        this.anims.play('idle')


    }

    update() {

        this.setVelocity(0, 0)

        if (canControl) {
            // Left and right movement
            if (this.cursors.left.isDown) {
                this.setVelocityX(-this.horseVelocity*1.5)
            } else if (this.cursors.right.isDown) {
                this.setVelocityX(this.horseVelocity*1.5)
            } else {
                this.setVelocityX(0)
            }

            // Vertical movement
            if (this.cursors.up.isDown) {
                this.setVelocityY(-this.horseVelocity)
            } else {
                if (this.y < this.bottomBoundary) {
                    this.setVelocityY(this.horseVelocity *1.5)
                } else {
                    this.setVelocityY(0)
                }
            }
        }
    }

    handleCollision () {
        this.collided = true
        this.setVelocity(0, 0)
    }
}
