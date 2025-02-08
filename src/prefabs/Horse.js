class Horse extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // Call Sprite parent class
        scene.add.existing(this)           // Add Horse to the existing scene
        scene.physics.add.existing(this)   // Add physics body to the scene

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)

        // Set custom Horse properties
        this.horseVelocity = 100

        this.bottomBoundary = scene.scale.height
        
        this.setScale(0.5)

        // Create controls
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    update() {

        this.setVelocity(0, 0)

        // Left and right movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.horseVelocity)
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.horseVelocity)
        } else {
            this.setVelocityX(0)
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.setVelocityY(-this.horseVelocity)
        } else {
            if (this.y < this.bottomBoundary) {
                this.setVelocityY(this.horseVelocity)
            } else {
                this.setVelocityY(0)
            }
        }
    }
}
