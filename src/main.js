'use strict'

const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 600,
    height: 450,
    pixelArt: true,
    zoom: 2,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [ Load, Play, Game ]
}

const game = new Phaser.Game(config)

let keyLEFT, keyRIGHT

let borderUIsize = game.config.height / 15
let bgSpeed = 1
let treeSpeed = 1
let horseVelo = 140
let canControl = true

let highScore = 0