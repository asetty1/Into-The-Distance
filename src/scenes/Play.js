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

        let depth = 3
        for (let i = 0; i < 2; i++) {
            let x = Phaser.Math.Between(0, this.scale.width)
            let y = Phaser.Math.Between(-100, 0)
            let tree = new Tree(this, x, y, 'bigTree', 0, 10)
            tree.setDepth(depth)
            this.trees.add(tree)
            depth--
        }    
    }

    update() {
        this.map.tilePositionY -= bgSpeed

        this.player.update()
    }
}