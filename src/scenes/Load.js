class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('bg', './assets/EndlessBg.png')
        this.load.image('menubg', './assets/menubg.png')
        this.load.image('bigTree', './assets/treeBig.png')
        this.load.image('smallTree', './assets/treeSmall.png')

        this.load.audio('sfx-select', './assets/select.wav')
        this.load.audio('bgMusic', './assets/bgmusic.mp3')
        this.load.audio('writing', './assets/writing.wav')
        this.load.audio('running', './assets/dirt.wav')
        this.load.audio('scared', './assets/scared.wav')

        this.load.spritesheet('player', './assets/spritesheet.png', {
            frameWidth: 98,
            frameHeight: 354
        })
        this.load.spritesheet('hitTree', './assets/horsehurt.png', {
            frameWidth: 98,
            frameHeight: 354
        })
        


    }    

    create() {

        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'menubg');
        bg.setOrigin(0.5);

        this.anims.create({
            key: 'idle',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 5})
        })

        this.anims.create({
            key: 'hitTree',
            frameRate: 9,
            repeat: 1,
            frames: this.anims.generateFrameNumbers('hitTree', { start: 0, end: 15})
        })
        

        let menuConfig = {
            fontFamily: 'amegrin',
            fontSize: '28px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        let textLines = [
            'Into The Distance',
            'Use the arrow keys to move!',
            'Make sure to avoid the trees to keep riding.',
            'Press an arrow key to start!'
        ]

        // Call typewriteText for each line
        this.typewriteTextLines(game.config.width / 2, game.config.height / 5, textLines, menuConfig)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

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

        this.bgMusic = this.sound.add('bgMusic', { loop: true})
        this.bgMusic.play()

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('sfx-select')
            this.scene.start('playScene');
        }
    }
}
