class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('bg', './assets/EndlessBg.png')
        this.load.image('bigTree', './assets/treeBig.png')

        this.load.spritesheet('player', './assets/spritesheet.png', {
            frameWidth: 98,
            frameHeight: 354
        })
    }    

    create() {

        this.anims.create({
            key: 'idle',
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5})
        })

        this.scene.start('playScene')
    }
}