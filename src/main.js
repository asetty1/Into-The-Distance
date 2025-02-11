/*

Hello!! This is a game called Into the Distance where you get to play as 
a cowboy riding off into the distance with your trusty horse. I admit I am 
not the best gamer and the game is probably starting off easier but that 
is on purpose so that I actually survive enough to test my game properly.
So the game is aimed at new gamers and myself :P
Here is my documentation for this project:

Visual Assests:
    Horse animations: Hand drawn by me
    Background: Built in Tiled using https://cainos.itch.io/pixel-art-top-down-basic?download#google_vignette
    Font: Fonspace - https://www.fontspace.com/amegrin-font-f119532

Audio:
    Main Background Music: https://www.youtube.com/watch?v=FOWEIw3j5V0
    SFX Sound: Created by me - https://chr15m.itch.io/jsfxr
    Horse Sounds: https://mixkit.co/free-sound-effects/horse/
    Typewriter: https://mixkit.co/free-sound-effects/typewriter/

Coding: 
    Looking through every phaser documentation and stack overflow example I could find
    The live coding examples from class
    My Rocket Patrol Refactor code
    God

Something I really enjoyed adding was the typewriter text with the typewriter audio!
It's a personal detail I like to add in all of my web based designs since I love the little
effect and sound that typewriter text sets up for a scene set in an older time. For the
art side, I'm just very proud of my horse and how the horse running animation came out 
along with the rider. I spent about 36 hours on this project from concept to product.

*/

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

let gameScores = {
    currentScore: 0,
    highScore:  0
}