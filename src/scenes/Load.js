class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('bg', './assets/EndlessBg.png')
        this.load.image('player', './assets/rider.png')
    }

    create() {
        this.scene.start('playScene')
    }
}