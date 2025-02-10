class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.image('bg', './assets/EndlessBg.png')
        this.load.image('menubg', './assets/menubg.png')
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
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hitTree', { start: 0, end: 15})
        })

        
        // // Load your local font
        // const newFontFace = new FontFace('amegrin', 'url(./assets/amegrin-.woff)');
        // newFontFace.load().then((loadedFont) => {
        //     document.fonts.add(loadedFont);
        //     console.log('Font loaded successfully!');
        // })
        

        let menuCongif = {
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

        this.add.text(game.config.width/2, game.config.height/5, 'Into The Distance', menuCongif).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/3, 'Use the arrow keys to move!', menuCongif).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Make sure to avoid the trees to keep riding.', menuCongif).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/3 * 2, 'Press <- for Regular or -> for Silly', menuCongif).setOrigin(0.5)

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //regular mode
            game.settings = {
                bgSpeed: 1,
                treeSpeed: 1,
                horseVelo: 140,
                spawnDelayMin: 500,
                spawnDelayMax: 1000,
                bgspeedIncrement: 0.02,
                treeSpeedIncrement: 0.02
            };
            //this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //silly mode
            game.settings = {
                bgSpeed: 2,
                treeSpeed: 2,
                horseVelo: 180,
                spawnDelayMin: 300,
                spawnDelayMax: 700,
                bgspeedIncrement: 0.05,
                treeSpeedIncrement: 0.05
            };
            //this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}
