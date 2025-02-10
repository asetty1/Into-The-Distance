class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

        this.spawnDelayMin = 500
        this.spawnDelayMax = 1000
        this.bgspeedIncrement = 0.01
        this.treeSpeedIncrement = 0.01
    }

    create() {
        // add background image
        this.map = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg').setOrigin(0, 0)
        this.player = new Horse(this, this.map.width / 2, 364, 'player')

        this.trees = this.add.group({
            runChildUpdate: true
        })

        let depth = 1000
        // for (let i = 0; i < 2; i++) {
        //     let x = Phaser.Math.Between(0, this.scale.width)
        //     let y = Phaser.Math.Between(-100, 0)
        //     let tree = new Tree(this, x, y, 'bigTree', 0, 10)
        //     tree.setDepth(depth)
        //     this.trees.add(tree)
        //     depth--
        // } 
        
        // for (let i = 0; i < 4; i++) {
        //     let x = Phaser.Math.Between(0, this.scale.width)
        //     let y = Phaser.Math.Between(-100, 0)
        //     let tree = new Tree(this, x, y, 'smallTree', 0, 10)
        //     tree.setDepth(depth)
        //     this.trees.add(tree)
        //     depth--
        // } 

        // Add timed event to spawn new trees at random intervals by recycling existing ones
        this.spawnTreeEvent = this.time.addEvent({
            delay: Phaser.Math.Between(this.spawnDelayMin, this.spawnDelayMax),
            callback: this.spawnTree,
            callbackScope: this,
            loop: true
        })

        // Add timed event to adjust spawn delay over time
        this.time.addEvent({
            delay: 1000, // Adjust the delay every second
            callback: this.adjustSpawnDelay,
            callbackScope: this,
            loop: true
        })

        this.updateBgspeedEvent = this.time.addEvent({
            delay: 1000, // Update bgspeed every second
            callback: this.updateBgspeed,
            callbackScope: this,
            loop: true
        })

        this.updateTreeSpeedEvent = this.time.addEvent({
            delay: 1000, // Update bgspeed every second
            callback: this.updateBgspeed,
            callbackScope: this,
            loop: true
        })

        this.physics.add.overlap(this.player, this.trees, this.handleCollision, null, this)
    }

    update() {
        this.map.tilePositionY -= bgSpeed

        this.player.update()
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
        if (this.spawnDelayMax > 500) {
            this.spawnDelayMax -= 100 // Decrease max delay
        }
        if (this.spawnDelayMin > 0) {
            this.spawnDelayMin -= 10 // Decrease min delay
        }

        // Update the spawnTreeEvent delay
        this.spawnTreeEvent.reset({
            delay: Phaser.Math.Between(this.spawnDelayMin, this.spawnDelayMax),
            callback: this.spawnTree,
            callbackScope: this,
            loop: true
        })
    }

    updateBgspeed() {
        // Increase bgspeed every second
        if (canControl) {
            bgSpeed += this.bgspeedIncrement
            treeSpeed += this.bgspeedIncrement
        }
    }


    handleCollision(player, tree) {
        console.log('Collision detected')
        horseVelo = 0
        bgSpeed = 0
        canControl = false
        

        player.handleCollision()

        player.anims.play('hitTree')

        //add code to implement control after animation plays
        //canControl = true
    }
}