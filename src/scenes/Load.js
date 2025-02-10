class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('bg', './assets/EndlessBg.png')
        this.load.image('bigTree', './assets/treeBig.png')
        this.load.image('smallTree', './assets/treeSmall.png')

        this.load.spritesheet('player', './assets/spritesheet.png', {
            frameWidth: 98,
            frameHeight: 354
        })
        this.load.spritesheet('hitTree', './assets/spritesheet2.png', {
            frameWidth: 98,
            frameHeight: 354
        })
    }    

    create() {

        this.anims.create({
            key: 'idle',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5})
        })

        this.anims.create({
            key: 'hitTree',
            frameRate: 9,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hitTree', { start: 0, end: 15})
        })

        this.scene.start('playScene')
    }
}