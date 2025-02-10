class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

        if (!game.settings) {
            console.warn("game.settings is undefined. Using default values.");
            game.settings = {
                bgSpeed: 1,
                treeSpeed: 1,
                horseVelo: 140,
                spawnDelayMin: 500,
                spawnDelayMax: 1000,
                bgspeedIncrement: 0.02,
                treeSpeedIncrement: 0.02
            };
        }

        this.bgSpeed = game.settings.bgSpeed
        this.treeSpeed = game.settings.treeSpeed
        this.horseVelo = game.settings.horseVelo
        this.spawnDelayMin = game.settings.spawnDelayMin
        this.spawnDelayMax = game.settings.spawnDelayMax
        this.bgspeedIncrement = game.settings.bgspeedIncrement
        this.treeSpeedIncrement = game.settings.treeSpeedIncrement
    }

    create() {
        // add background image
        this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg').setOrigin(0, 0)
        this.player = new Horse(this, this.map.width / 2, 364, 'player')

        this.trees = this.add.group({
            runChildUpdate: true
        })

        let depth = 1000
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

        this.physics.add.overlap(this.player, this.trees, this.handleCollision, null, this)
    }

    update() {
        if (canControl) {
            this.map.tilePositionY -= this.bgSpeed;
        }

        this.player.update();
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
        horseVelo = 0
        bgSpeed = 0
        canControl = false

        player.handleCollision()

        player.anims.play('hitTree').on('animationcomplete', () => {
            canControl = true
            this.collisionHandled = false
        })

        // Set flag to indicate collision has been handled
        this.collisionHandled = true
    }
}