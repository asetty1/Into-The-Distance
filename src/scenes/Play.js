class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

        this.spawnDelayMin = 500
        this.spawnDelayMax = 1000
        this.bgspeedIncrement = 0.02
        this.treeSpeedIncrement = 0.02
        this.score = 0
    }

    create() {
        // add background image
        this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg').setOrigin(0, 0)
        this.player = new Horse(this, this.map.width / 2, 364, 'player')

        this.trees = this.add.group({
            runChildUpdate: true
        })

        let depth = 100000
        for (let i = 0; i < 2; i++) {
            let x = Phaser.Math.Between(0, this.scale.width)
            let y = Phaser.Math.Between(-1000, 0)
            let tree = new Tree(this, x, y, 'bigTree', 0, 10)
            tree.setDepth(depth)
            this.trees.add(tree)
            depth--
        } 
        
        for (let i = 0; i < 4; i++) {
            let x = Phaser.Math.Between(0, this.scale.width)
            let y = Phaser.Math.Between(-1000, 0)
            let tree = new Tree(this, x, y, 'smallTree', 0, 10)
            tree.setDepth(depth)
            this.trees.add(tree)
            depth--
        } 

        this.time.addEvent({
            delay: 60000, // 60 seconds
            callback: this.endGame,
            callbackScope: this
        })

       this.time.addEvent ({
            delay: 1000,
            callback: this.addScore,
            callbackScope: this,
            loop: true
        })

    
        let scoreConfig = {
            fontFamily: 'amegrin',
            fontSize: '28px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 200
        }

        this.scoreText = this.add.text(game.config.width - 220, 0, `Score: ${this.score}`, scoreConfig)
        this.scoreText.setDepth(1000)


        this.tenSecondsLeftText = this.add.text(game.config.width / 2, game.config.height / 2, '10 Seconds Left!', {
            fontFamily: 'amegrin',
            fontSize: '28px',
            color: '#843605',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }).setOrigin(0.5).setVisible(false)

        this.time.delayedCall(50000, () => {
            this.sound.play('sfx-select')
            this.tenSecondsLeftText.setVisible(true)
            this.time.delayedCall(1000, () => {
                this.tenSecondsLeftText.setVisible(false)
            }, [], this)
        }, [], this)

        // Add timed event to spawn new trees at random intervals by recycling existing ones
        this.spawnTreeEvent = this.time.addEvent({
            delay: Phaser.Math.Between(this.spawnDelayMin, this.spawnDelayMax),
            callback: this.spawnTree,
            callbackScope: this,
            loop: true
        })

        // Add timed event to adjust spawn delay over time
        this.time.addEvent({
            delay: 1000,
            callback: this.adjustSpawnDelay,
            callbackScope: this,
            loop: true
        })

        this.updateBgspeedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateBgspeed,
            callbackScope: this,
            loop: true
        })

        this.updateTreeSpeedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateBgspeed,
            callbackScope: this,
            loop: true
        })

        this.run = this.sound.add('running', { loop: true })
        this.run.play()


        this.physics.add.overlap(this.player, this.trees, this.handleCollision, null, this)
    }

    update() {
        console.log(this.score)
        this.map.tilePositionY -= bgSpeed

        this.player.update()

        this.scoreText.setText(`Score: ${this.score}`)
    }
    
    addScore() {
        this.score += 1
    }

    loseScore() {
        this.score -= 5
    }

    spawnTree() {
        let x = Phaser.Math.Between(0, this.scale.width)
        let y = -50
        let texture = Phaser.Math.RND.pick(['bigTree', 'smallTree'])
        let tree = new Tree(this, x, y, texture, 0, 10)
        tree.setDepth(1000 - this.trees.getChildren().length)
        this.trees.add(tree)
    }

    adjustSpawnDelay() {
        if (canControl) {
            if (this.spawnDelayMax > 500) {
                this.spawnDelayMax -= 100 // Decrease max delay
            }
            if (this.spawnDelayMin > 200) {
                this.spawnDelayMin -= 25 // Decrease min delay
            }
    
            // Update the spawnTreeEvent delay
            this.spawnTreeEvent.reset({
                delay: Phaser.Math.Between(this.spawnDelayMin, this.spawnDelayMax),
                callback: this.spawnTree,
                callbackScope: this,
                loop: true
            })
        }
    }

    updateBgspeed() {
        // Increase bgspeed every second
        if (canControl) {
            bgSpeed += this.bgspeedIncrement
            treeSpeed += this.bgspeedIncrement
        }
    }


    handleCollision(player, tree) {
        if (this.collisionHandled) {
            return
        }

        console.log('Collision detected')
        this.sound.play('scared')
        let oldbgspeed = bgSpeed
        horseVelo = 0
        bgSpeed = 0
        canControl = false
        this.loseScore()
        this.run.stop()

        player.handleCollision()

        tree.destroy()

        player.anims.play('hitTree').on('animationcomplete', () => {
            canControl = true
            this.collisionHandled = false 
            player.anims.play('idle')
            bgSpeed = treeSpeed
            this.run.play()

        })

        // Set flag to indicate collision has been handled
        this.collisionHandled = true
    }

    endGame() {
        if (this.run) {
            this.run.stop()
        }

        gameScores.currentScore = this.score
        if (this.score > gameScores.highScore) {
            gameScores.highScore = this.score
        }

        console.log('Current score: ', gameScores.currentScore)
        console.log('highscore: ', gameScores.highScore)


        this.scene.stop('playScene')
        this.scene.start('gameOver')

    }
}