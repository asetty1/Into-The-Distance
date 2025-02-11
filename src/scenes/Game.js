class Game extends Phaser.Scene {
    constructor() {
        super("gameOver")
    }

    create() {
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'menubg');
        bg.setOrigin(0.5);

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

        let textLines = [
            'Times up! Want to keep riding?',
            'Does your horse want to keep riding',
            'after all those trees you hit?',
            'Press (R) to Restart or (M) for the Menu'
        ]

        this.typewriteTextLines(game.config.width / 2, game.config.height / 5, textLines, scoreConfig)


        this.add.text(game.config.width / 2 - 100, game.config.height / 2 - 200, `Your Score: ${gameScores.currentScore}`, scoreConfig).setOrigin(0.5)
        this.add.text(game.config.width / 2 + 100, game.config.height / 2 - 200, `High Score: ${gameScores.highScore}`, scoreConfig).setOrigin(0.5)
        // this.add.text(game.config.width / 2, game.config.height / 2 - 32, 'Times up! Want to keep riding?', scoreConfig).setOrigin(0.5)
        // this.add.text(game.config.width / 2, game.config.height / 2, 'Does your horse want to keep riding', scoreConfig).setOrigin(0.5)
        // this.add.text(game.config.width / 2, game.config.height / 2 + 32, 'after all those trees you hit?', scoreConfig).setOrigin(0.5)
        // this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or -> for the Menu', scoreConfig).setOrigin(0.5)
        this.gameOver = true

        this.input.keyboard.on('keydown-R', () => {
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        })

        this.input.keyboard.on('keydown-M', () => {
            this.sound.play('sfx-select')
            this.scene.start('loadScene')
        })
    }

    typewriteTextLines(x, y, lines, config) {
        let lineIndex = 0
        let charIndex = 0
        let displayText = ''
        let textObject = this.add.text(x, y, '', config).setOrigin(0.5)

        this.time.addEvent({
            delay: 50,
            callback: () => {
                if (charIndex < lines[lineIndex].length) {
                    this.sound.play('writing', 0, 0.5)
                    displayText += lines[lineIndex][charIndex]
                    textObject.setText(displayText)
                    charIndex++
                } else {
                    lineIndex++
                    charIndex = 0
                    displayText = ''

                    if (lineIndex < lines.length) {
                        textObject = this.add.text(x, y + 64 * lineIndex, '', config).setOrigin(0.5)
                    } else {
                        this.time.removeAllEvents()
                    }
                }
            },
            loop: true
        })
    }
}