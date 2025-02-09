class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
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
            let y = Phaser.Math.Between(-100, 0)
            let tree = new Tree(this, x, y, 'bigTree', 0, 10)
            tree.setDepth(depth)
            this.trees.add(tree)
            depth--
        } 
        
        for (let i = 0; i < 4; i++) {
            let x = Phaser.Math.Between(0, this.scale.width)
            let y = Phaser.Math.Between(-100, 0)
            let tree = new Tree(this, x, y, 'smallTree', 0, 10)
            tree.setDepth(depth)
            this.trees.add(tree)
            depth--
        } 

        this.time.addEvent({
            delay: Phaser.Math.Between(0, 1000),
            callback: this.spawnTree,
            callbackScope: this,
            loop: true
        })

        this.physics.add.collider(this.player, this.trees, this.handleCollision, null, this)
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

    handleCollision(player, tree) {
        console.log('Collision detected')
    }
}