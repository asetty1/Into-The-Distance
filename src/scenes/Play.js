class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg').setOrigin(0, 0)
        this.player = new Horse(this, 100, 364, 'player')

    
    }

    update() {
        this.map.tilePositionY -= bgSpeed

        this.player.update()
    }
}