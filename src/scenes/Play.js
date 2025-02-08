class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.heigth, 'bg').setOrigin(0, 0)
        this.player = this.add.image(0, 0, 'player').setOrigin(0)
    }

    update() {
        this.map.tilePositionY -= 1
    }
}