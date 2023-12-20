function chatStart (text: string) {
    stopControls = true
    chatBox = sprites.create(assets.image`ChatInvis`, SpriteKind.Player)
    chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    animation.runImageAnimation(
    chatBox,
    assets.animation`ChatStart`,
    50,
    false
    )
    for (let index = 0; index < 12; index++) {
        chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        pause(50)
    }
    textSprite = textsprite.create(text, 0, 15)
    textSprite.setCharsPerLine(25)
    if (text.length > 25) {
        textSprite.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 44)
    } else {
        textSprite.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 45)
    }
    pauseUntil(() => !(controller.B.isPressed()))
    pause(2)
    while (!(controller.B.isPressed())) {
        pause(2)
    }
    sprites.destroy(textSprite)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (controller.B.isPressed()) {
        if (!(stopControls)) {
            if (distanceCheck(18, npc1) && tilemap2 == 0) {
                chatStart("Hey there.")
                renderText("Excuse me but I don't    know you yet. What's yourname?")
                playerName = game.askForString("Enter your character's name")
                renderText("So, your name is " + playerName + ", correct?")
                chatEnd()
            }
            if (distanceCheck(7, hitbox1)) {
                scene.setBackgroundColor(15)
                tiles.setCurrentTilemap(tilemap`BarTilemap`)
                tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 4))
                tilemap2 = 1
            }
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(stopControls)) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -150
        } else if (ledgeGrabbed) {
            mySprite.ay = 350
            if (ledgeVelocity == 1) {
                mySprite.vy = -150
                mySprite.vx = 100
            } else if (ledgeVelocity == -1) {
                mySprite.vy = -150
                mySprite.vx = -100
            } else {
                mySprite.vy = -150
            }
        }
    }
})
function renderText (text: string) {
    textSprite = textsprite.create(text, 0, 15)
    textSprite.setCharsPerLine(25)
    if (text.length > 25) {
        textSprite.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 44)
    } else {
        textSprite.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) + 46)
    }
    pauseUntil(() => !(controller.B.isPressed()))
    pause(2)
    while (!(controller.B.isPressed())) {
        pause(2)
    }
    sprites.destroy(textSprite)
}
function distanceCheck (distance: number, sprite: Sprite) {
    if (spriteutils.distanceBetween(mySprite, sprite) <= distance) {
        return true
    } else {
        return false
    }
}
function LedgeGrab () {
    ledgeGrabbed = true
    mySprite.ay = 0
    mySprite.vy = 0
    tiles.placeOnTile(mySprite, mySprite.tilemapLocation())
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`LedgeR`)) {
        mySprite.x += 1
    } else if (mySprite.tileKindAt(TileDirection.Center, assets.tile`LedgeL`)) {
        mySprite.x += -1
    }
}
function chatEnd () {
    animation.runImageAnimation(
    chatBox,
    assets.animation`ChatEnd`,
    50,
    false
    )
    pause(650)
    sprites.destroy(chatBox)
    stopControls = false
    pauseUntil(() => !(controller.B.isPressed()))
}
let ledgeAim: Sprite = null
let ledgeVelocity = 0
let ledgeGrabbed = false
let playerName = ""
let textSprite: TextSprite = null
let chatBox: Sprite = null
let stopControls = false
let tilemap2 = 0
let hitbox1: Sprite = null
let mySprite: Sprite = null
let npc1: Sprite = null
scene.setBackgroundImage(assets.image`Background`)
tiles.setCurrentTilemap(tilemap`Level1_Tilemap`)
let building1 = sprites.create(assets.image`Building_1`, SpriteKind.Food)
npc1 = sprites.create(assets.image`NPC_1`, SpriteKind.Food)
mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
hitbox1 = sprites.create(assets.image`15Invis`, SpriteKind.Food)
tiles.placeOnTile(building1, tiles.getTileLocation(26, 11))
tiles.placeOnTile(npc1, tiles.getTileLocation(11, 14))
tiles.placeOnTile(mySprite, tiles.getTileLocation(6, 14))
scene.cameraFollowSprite(mySprite)
hitbox1.setPosition(449, 230)
mySprite.ay = 350
mySprite.fx = 1000
characterAnimations.loopFrames(
mySprite,
assets.animation`RunR`,
150,
characterAnimations.rule(Predicate.MovingRight)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`RunL`,
100,
characterAnimations.rule(Predicate.MovingLeft)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`PlayerR`,
200,
characterAnimations.rule(Predicate.FacingRight, Predicate.NotMoving)
)
characterAnimations.loopFrames(
mySprite,
assets.animation`PlayerL`,
200,
characterAnimations.rule(Predicate.FacingLeft, Predicate.NotMoving)
)
music.play(music.createSong(assets.song`TheForgotten`), music.PlaybackMode.LoopingInBackground)
scroller.setCameraScrollingMultipliers(0.1, 0.1)
tilemap2 = 0
game.onUpdateInterval(5, function () {
    if (mySprite.tileKindAt(TileDirection.Center, assets.tile`LedgeL`) || mySprite.tileKindAt(TileDirection.Center, assets.tile`LedgeR`) || mySprite.tileKindAt(TileDirection.Center, assets.tile`Hook`)) {
        if (!(ledgeGrabbed)) {
            LedgeGrab()
        }
    } else {
        ledgeGrabbed = false
        if (ledgeVelocity != 0) {
            sprites.destroy(ledgeAim)
            ledgeVelocity = 0
        }
    }
    if (controller.right.isPressed()) {
        if (ledgeGrabbed) {
            if (ledgeVelocity == 0) {
                ledgeAim = sprites.create(assets.image`ArrowR`, SpriteKind.Player)
                ledgeVelocity = 1
            } else {
                ledgeAim.setImage(assets.image`ArrowR`)
                animation.runImageAnimation(
                mySprite,
                assets.animation`PlayerR`,
                200,
                false
                )
                ledgeAim.x = mySprite.x + 9
                ledgeAim.y = mySprite.y - 14
            }
        } else if (!(stopControls)) {
            mySprite.vx = 125
        }
    } else if (controller.left.isPressed()) {
        if (ledgeGrabbed) {
            if (ledgeVelocity == 0) {
                ledgeAim = sprites.create(assets.image`ArrowL`, SpriteKind.Player)
                ledgeVelocity = -1
            } else {
                ledgeAim.setImage(assets.image`ArrowL`)
                animation.runImageAnimation(
                mySprite,
                assets.animation`PlayerL`,
                200,
                false
                )
                ledgeAim.x = mySprite.x - 9
                ledgeAim.y = mySprite.y - 14
            }
        } else if (!(stopControls)) {
            mySprite.vx = -125
        }
    } else {
        if (ledgeVelocity != 0) {
            ledgeVelocity = 0
            sprites.destroy(ledgeAim)
        }
    }
    if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingRight)) && mySprite.vy != 0) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`JumpR`,
        500,
        false
        )
    } else if (characterAnimations.matchesRule(mySprite, characterAnimations.rule(Predicate.FacingLeft)) && mySprite.vy != 0) {
        animation.runImageAnimation(
        mySprite,
        assets.animation`JumpL`,
        500,
        false
        )
    }
})
