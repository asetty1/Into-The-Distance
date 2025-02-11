class Game extends Phaser.Scene {
    constructor() {
        super("gameOver")
    }

    create() {
        let scoreConfig = {
            fontFamily: 'amegrin',
            fontSize: '28px',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.text(game.config.width / 2, game.config.height / 2 - 64, 'Times up! Want to keep riding?', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2, 'Does your horse want to keep riding', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 32, 'after all those trees you hit?', scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or -> for the Menu', scoreConfig).setOrigin(0.5)
        this.gameOver = true

        this.input.keyboard.on('keydown-R', () => {
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        })

        this.input.keyboard.on('keydown-LEFT', () => {
            this.sound.play('sfx-select')
            this.scene.start('loadScene')
        })
    }
}