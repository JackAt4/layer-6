namespace SpriteKind {
    export const Document = SpriteKind.create()
    export const Package = SpriteKind.create()
    export const NumberDisplay = SpriteKind.create()
}
function chatStart (text: string, num: number) {
    stopControls = true
    chatBox = sprites.create(assets.image`160Invis`, SpriteKind.Player)
    chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    if (num == 1) {
        animation.runImageAnimation(
        chatBox,
        assets.animation`ChatStart`,
        50,
        false
        )
    } else if (num == 2) {
        animation.runImageAnimation(
        chatBox,
        assets.animation`ChatHoloStart`,
        25,
        false
        )
    }
    for (let index = 0; index < 12; index++) {
        chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        pause(50)
    }
    if (num == 1) {
        textSprite = textsprite.create(text, 0, 15)
    } else if (num == 2) {
        textSprite = textsprite.create(text, 9, 15)
    }
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
        if (!(stopControls) && gameStart) {
            if (distanceCheck(18, npc1) && currentTilemap == 0 && talkTimes == 0 && progress == 0) {
                chatStart("Hey Blake, anything new?", 1)
                renderText("I heard you recently got the job at Intex.", 1)
                renderText("Well, hope it goes well  for you.", 1)
                chatEnd(1)
                talkTimes += 1
            } else if (distanceCheck(18, npc1) && currentTilemap == 0 && talkTimes == 1 && progress == 0) {
                chatStart("I think the bar is       somewhere around here.", 1)
                renderText("I think you're meeting  is on the third floor.", 1)
                chatEnd(1)
            } else if (distanceCheck(18, npc1) && currentTilemap == 1) {
                chatStart("Hey Blake,", 1)
                renderText("Anything you're needing  today?", 1)
                chatOptions([miniMenu.createMenuItem("Change Music", assets.image`Music`), miniMenu.createMenuItem("Read Documents", assets.image`Lore`), miniMenu.createMenuItem("Nevermind", assets.image`Nevermind`)])
                myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                    if (selectedIndex == 0) {
                        myMenu.close()
                        renderText("What do you want to      change the song to?", 1)
                        chatOptions([miniMenu.createMenuItem("Default"), miniMenu.createMenuItem("The World's Husk"), miniMenu.createMenuItem("Nevermind")])
                        myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
                            if (selectedIndex == 0) {
                                music.stopAllSounds()
                                music.play(music.createSong(assets.song`Downtime`), music.PlaybackMode.LoopingInBackground)
                                songPreference = 0
                            } else if (selectedIndex == 1) {
                                music.stopAllSounds()
                                music.play(music.createSong(assets.song`TheWorldsHusk`), music.PlaybackMode.LoopingInBackground)
                                songPreference = 1
                            } else if (selectedIndex == 2) {
                                myMenu.close()
                                chatEnd(1)
                            }
                        })
                    } else if (selectedIndex == 1) {
                        myMenu.close()
                        if (docCollected) {
                            viewDocuments()
                        } else {
                            renderText("You don't have any       documents", 1)
                            chatEnd(1)
                        }
                    } else if (selectedIndex == 2) {
                        myMenu.close()
                        chatEnd(1)
                    }
                })
            } else if (distanceCheck(18, npc1) && currentTilemap == 2) {
                chatStart("You should call the boss,", 1)
                renderText("Use the computer over    there", 1)
                chatEnd(1)
            } else if (distanceCheck(18, npc1) && currentTilemap == 0 && talkTimes == 0 && progress == 1) {
                chatStart("Hey man,", 1)
                renderText("Made your first delivery?", 1)
                renderText("Good job, I assume it waseasy?", 1)
                renderText("If you feel like you did poorly,", 1)
                renderText("You can always replay themission for a better time", 1)
                chatEnd(1)
            }
            if (distanceCheck(7, hitbox1) && currentTilemap == 0) {
                loadTilemap(1, 1, 5)
            } else if (distanceCheck(7, hitbox1) && currentTilemap == 1) {
                loadTilemap(0, 27, 14)
            } else if (distanceCheck(7, hitbox2) && currentTilemap == 1) {
                loadTilemap(2, 0, 0)
            } else if (distanceCheck(7, hitbox2) && currentTilemap == 2 && progress == 0) {
                chatStart("I should talk to the boss", 1)
                chatEnd(1)
            } else if (distanceCheck(7, hitbox2) && currentTilemap == 2 && progress > 0) {
                loadTilemap(1, 13, 5)
            } else if (distanceCheck(16, hitbox1) && currentTilemap == 2) {
                cutsceneStart(2)
            } else if (distanceCheck(10, hitbox1) && currentTilemap == 3) {
                if (packageCollected) {
                    missionComplete(0)
                } else {
                	
                }
            } else if (distanceCheck(10, hitbox1) && currentTilemap == 4) {
                if (packageCollected) {
                    missionComplete(1)
                } else {
                	
                }
            }
        }
    }
})
function loadTilemap (num: number, col: number, row: number) {
    if (num == 0) {
        color.startFadeFromCurrent(color.Black, 500)
        color.pauseUntilFadeDone()
        music.stopAllSounds()
        music.play(music.createSong(assets.song`TheForgotten`), music.PlaybackMode.LoopingInBackground)
        scene.setBackgroundImage(assets.image`CityBackground`)
        tiles.setCurrentTilemap(tilemap`Level1_Tilemap`)
        for (let value of displaySpritesList) {
            value.setImage(assets.image`9Invis`)
        }
        decoration1.setImage(assets.image`Building_1`)
        cutsceneBorders.setImage(assets.image`160Invis`)
        npc1.setImage(assets.image`NPC_1`)
        hitbox1.setPosition(449, 230)
        hitbox2.setPosition(0, 0)
        tiles.placeOnTile(decoration1, tiles.getTileLocation(26, 11))
        tiles.placeOnTile(npc1, tiles.getTileLocation(11, 14))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(col, row))
        currentTilemap = 0
        color.startFade(color.Black, color.originalPalette, 500)
        color.pauseUntilFadeDone()
    } else if (num == 1) {
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        music.stopAllSounds()
        if (songPreference == 0) {
            music.play(music.createSong(assets.song`Downtime`), music.PlaybackMode.LoopingInBackground)
        } else if (songPreference == 1) {
            music.play(music.createSong(assets.song`TheWorldsHusk`), music.PlaybackMode.LoopingInBackground)
        }
        scene.setBackgroundImage(assets.image`BackgroundBlack`)
        tiles.setCurrentTilemap(tilemap`BarTilemap`)
        decoration1.setImage(assets.image`Bar`)
        npc1.setImage(assets.image`Bartender`)
        npc1.setPosition(155, 83)
        hitbox2.setPosition(222, 85)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(col, row))
        tiles.placeOnTile(decoration1, tiles.getTileLocation(7, 3))
        tiles.placeOnTile(hitbox1, tiles.getTileLocation(0, 5))
        currentTilemap = 1
        color.startFade(color.Black, color.originalPalette, 500)
        color.pauseUntilFadeDone()
    } else if (num == 2) {
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        scene.setBackgroundImage(assets.image`BackgroundBlack`)
        tiles.setCurrentTilemap(tilemap`BarTilemap`)
        decoration1.setImage(assets.image`Floor3`)
        npc1.setImage(assets.image`NPC_2`)
        npc1.setPosition(184, 89)
        hitbox1.setPosition(96, 88)
        currentTilemap = 2
        color.startFade(color.Black, color.originalPalette, 500)
        color.pauseUntilFadeDone()
    } else if (num == 3) {
        music.stopAllSounds()
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        animation.stopAnimation(animation.AnimationTypes.All, decoration1)
        currentTilemap = 3
        packageSprite = sprites.create(assets.image`Box`, SpriteKind.Package)
        documentSprite = sprites.create(assets.image`Document`, SpriteKind.Document)
        scene.setBackgroundImage(assets.image`CityBackground`)
        tiles.setCurrentTilemap(tilemap`Tutorial`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(col, row))
        tiles.placeOnTile(packageSprite, tiles.getTileLocation(1, 22))
        tiles.placeOnTile(documentSprite, tiles.getTileLocation(13, 10))
        cutsceneBorders.setImage(assets.image`160Invis`)
        decoration1.setImage(assets.image`TutorialDecord`)
        npc1.setPosition(0, 0)
        hitbox1.setPosition(226, 236)
        decoration1.setPosition(128, 280)
        sprites.destroy(missionMenuBackground)
        missionMenu.close()
        animation.runImageAnimation(
        decoration1,
        assets.animation`TutorialDecordAnim`,
        100,
        true
        )
        if (songPreference == 0) {
            music.play(music.createSong(assets.song`FightTheClock_Intro`), music.PlaybackMode.LoopingInBackground)
        } else if (songPreference == 1) {
            music.play(music.createSong(assets.song`Bossfight - Extended`), music.PlaybackMode.LoopingInBackground)
        }
        scene.centerCameraAt(mySprite.x, mySprite.y)
        color.startFade(color.Black, color.originalPalette, 500)
        color.pauseUntilFadeDone()
        chatStart("Hello, can you hear me?", 2)
        renderText("Hi there! I'm the...", 2)
        renderText("ASSISTANT for DELIVERY   RUNS INTENDED for        ASSISTING NEWCOMERS", 2)
        renderText("Or, you could just call  me ADRIAN.", 2)
        renderText("I'm here to teach you howto do delivery runs", 2)
        renderText("And just to assist you ingeneral.", 2)
        scene.centerCameraAt(packageSprite.x, packageSprite.y)
        chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        renderText("First, you need to pick  up the package", 2)
        scene.centerCameraAt(hitbox1.x, hitbox1.y)
        chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        renderText("Then, rush to the exit   door", 2)
        renderText("Simple enough, right?", 2)
        renderText("Your performance will be calculated by your time.", 2)
        scene.cameraFollowSprite(mySprite)
        chatBox.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
        renderText("There's also ledges you  can grab, they're usuallybrown.", 2)
        renderText("Anyway, go ahead and makethe delivery.", 2)
        chatEnd(2)
        Time1 = game.runtime()
        stopControls = false
        duringCutscene = false
    } else if (num == 4) {
        music.stopAllSounds()
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        animation.stopAnimation(animation.AnimationTypes.All, decoration1)
        currentTilemap = 4
        packageSprite = sprites.create(assets.image`Box`, SpriteKind.Package)
        documentSprite = sprites.create(assets.image`Document`, SpriteKind.Document)
        decoration2 = sprites.create(assets.image`Door`, SpriteKind.Food)
        scene.setBackgroundImage(assets.image`CityBackground`)
        tiles.setCurrentTilemap(tilemap`Level2_Tilemap`)
        tiles.placeOnTile(mySprite, tiles.getTileLocation(col, row))
        tiles.placeOnTile(packageSprite, tiles.getTileLocation(29, 54))
        tiles.placeOnTile(documentSprite, tiles.getTileLocation(22, 22))
        decoration1.setImage(assets.image`Level2Decor`)
        decoration1.setPosition(96, 850)
        decoration2.setPosition(418, 178)
        decoration2.z = -1
        hitbox1.setPosition(418, 184)
        cutsceneBorders.setImage(assets.image`160Invis`)
        npc1.setPosition(0, 0)
        sprites.destroy(missionMenuBackground)
        missionMenu.close()
        if (songPreference == 0) {
            music.play(music.createSong(assets.song`FightTheClock`), music.PlaybackMode.LoopingInBackground)
        } else if (songPreference == 1) {
            music.play(music.createSong(assets.song`Bossfight - Extended`), music.PlaybackMode.LoopingInBackground)
        }
        scene.centerCameraAt(mySprite.x, mySprite.y)
        color.startFade(color.Black, color.originalPalette, 500)
        color.pauseUntilFadeDone()
        scene.cameraFollowSprite(mySprite)
        chatStart("This place is a whole lotbigger this time around, so try to get through it fast", 2)
        renderText("You know what to do.", 2)
        chatEnd(2)
        Time1 = game.runtime()
        stopControls = false
        duringCutscene = false
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(stopControls) && gameStart) {
        if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
            mySprite.vy = -160
        } else if (ledgeGrabbed) {
            mySprite.ay = 360
            if (ledgeVelocity == 1) {
                mySprite.vy = -160
                mySprite.vx = 100
            } else if (ledgeVelocity == -1) {
                mySprite.vy = -160
                mySprite.vx = -100
            } else {
                mySprite.vy = -160
            }
        }
    }
})
function startGame () {
    music.stopAllSounds()
    scene.setBackgroundImage(assets.image`CityBackground`)
    tiles.setCurrentTilemap(tilemap`Level1_Tilemap`)
    decoration1 = sprites.create(assets.image`Building_1`, SpriteKind.Food)
    npc1 = sprites.create(assets.image`NPC_1`, SpriteKind.Food)
    interaction_icon = sprites.create(assets.image`9Invis`, SpriteKind.Food)
    mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
    hitbox1 = sprites.create(assets.image`15Invis`, SpriteKind.Food)
    hitbox2 = sprites.create(assets.image`15Invis`, SpriteKind.Food)
    cutsceneBorders = sprites.create(assets.image`160Invis`, SpriteKind.Player)
    tiles.placeOnTile(decoration1, tiles.getTileLocation(26, 11))
    tiles.placeOnTile(npc1, tiles.getTileLocation(11, 14))
    tiles.placeOnTile(mySprite, tiles.getTileLocation(6, 14))
    scene.cameraFollowSprite(mySprite)
    hitbox1.setPosition(449, 230)
    hitbox2.setPosition(0, 0)
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
    150,
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
    scroller.setCameraScrollingMultipliers(0.05, 0)
    currentTilemap = 0
    songPreference = 0
    stopControls = false
    duringCutscene = false
    docCollected = false
    gameStart = true
    parTimes = [1500, 3400]
    docsCollection = []
    levelsList = [
    "Mission 2: Locked",
    "Mission 3: Locked",
    "Mission 4: Locked",
    "Mission 5: Locked"
    ]
    color.startFade(color.Black, color.originalPalette)
    color.pauseUntilFadeDone()
}
function numberDisplay (version: number) {
    tempNumber = 0
    displayNumbers = [
    assets.image`Display_0`,
    assets.image`Display_1`,
    assets.image`Display_2`,
    assets.image`Display_3`,
    assets.image`Display_4`,
    assets.image`Display_5`,
    assets.image`Display_6`,
    assets.image`Display_7`,
    assets.image`Display_8`,
    assets.image`Display_9`
    ]
    displayNumber1 = sprites.create(assets.image`Display_1`, SpriteKind.NumberDisplay)
    displayNumber2 = sprites.create(assets.image`Display_2`, SpriteKind.NumberDisplay)
    displayNumber3 = sprites.create(assets.image`Display_3`, SpriteKind.NumberDisplay)
    displayNumber4 = sprites.create(assets.image`Display_4`, SpriteKind.NumberDisplay)
    displayNumber5 = sprites.create(assets.image`Display_5`, SpriteKind.NumberDisplay)
    displayNumber6 = sprites.create(assets.image`Display_6`, SpriteKind.NumberDisplay)
    displaySpritesList = [
    displayNumber1,
    displayNumber2,
    displayNumber3,
    displayNumber4,
    displayNumber5,
    displayNumber6
    ]
    if (version == 1) {
        for (let index2 = 0; index2 <= 5; index2++) {
            if (index2 == 2 || index2 == 4) {
                tempNumber += 2
            }
            TimeText2 = TimeText.charAt(TimeText.length - (index2 + 1))
            displaySpritesList[index2].setFlag(SpriteFlag.RelativeToCamera, true)
            displaySpritesList[index2].setPosition(136 - tempNumber - index2 * 11, 41)
            displaySpritesList[index2].setImage(displayNumbers[parseFloat(TimeText2)])
            pause(50)
        }
    }
}
function missionboard () {
    music.stopAllSounds()
    music.play(music.createSong(assets.song`WhatsNext`), music.PlaybackMode.LoopingInBackground)
    cutsceneBorders.setImage(assets.image`BackgroundBlack`)
    missionMenuBackground = sprites.create(assets.image`160Invis`, SpriteKind.Player)
    missionMenuBackground.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    color.setPalette(
    color.originalPalette
    )
    animation.runImageAnimation(
    missionMenuBackground,
    assets.animation`MissionMenu`,
    25,
    false
    )
    pause(1000)
    missionMenu = miniMenu.createMenuFromArray([
    miniMenu.createMenuItem("Mission 1: Tutorial"),
    miniMenu.createMenuItem(levelsList[0]),
    miniMenu.createMenuItem(levelsList[1]),
    miniMenu.createMenuItem(levelsList[2]),
    miniMenu.createMenuItem(levelsList[3])
    ])
    missionMenu.setDimensions(156, 116)
    missionMenu.setPosition(scene.cameraProperty(CameraProperty.Left) + 3, scene.cameraProperty(CameraProperty.Top) + 3)
    missionMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 15)
    missionMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 9)
    missionMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 1)
    missionMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 15)
    missionMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Padding, 5)
    missionMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Mission 1: Tutorial") {
            loadTilemap(3, 2, 30)
        } else if (selection == "Mission 2: First Job") {
            loadTilemap(4, 9, 54)
        }
    })
}
function mainMenuManiacalMadness (num: number) {
    if (num == 1) {
        mainMenu.setDimensions(118, 60)
        mainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
        mainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Padding, 5)
        mainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 15)
        mainMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 12)
        mainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 11)
        mainMenu.setPosition(22, 54)
    } else if (num == 2) {
        optionsMenu.setDimensions(118, 60)
        optionsMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
        optionsMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Padding, 5)
        optionsMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Background, 15)
        optionsMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 12)
        optionsMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 11)
        optionsMenu.setPosition(22, 54)
    } else if (num == 3) {
        optionsMenu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Volume Up:" + convertToText(vol)), miniMenu.createMenuItem("Volume Down:" + convertToText(vol)), miniMenu.createMenuItem("Back")])
        mainMenuManiacalMadness(2)
        notInOptions = false
        optionsMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
            if (selectedIndex == 0) {
                optionsMenu.close()
                vol += 15
                if (vol > 255) {
                    vol = 255
                }
                music.setVolume(vol)
                mainMenuManiacalMadness(3)
            } else if (selectedIndex == 1) {
                optionsMenu.close()
                vol += -15
                if (vol < 0) {
                    vol = 0
                }
                music.setVolume(vol)
                mainMenuManiacalMadness(3)
                optionsMenu.moveSelection(miniMenu.MoveDirection.Down)
            } else if (selectedIndex == 2) {
                optionsMenu.close()
                mainMenu.moveSelection(miniMenu.MoveDirection.Down)
                notInOptions = true
            }
        })
    }
}
function missionComplete (level: number) {
    Time2 = game.runtime()
    Time1 = Time2 - Time1
    Time1 = Time1 * 0.1
    Time1 = Math.round(Time1)
    if (Time1 <= parTimes[level]) {
        rank = 0
    } else if (Time1 <= parTimes[level] * 1.2) {
        rank = 1
    } else if (Time1 <= parTimes[level] * 1.4) {
        rank = 2
    } else if (Time1 <= parTimes[level] * 1.6) {
        rank = 3
    } else if (Time1 <= parTimes[level] * 1.8) {
        rank = 4
    } else {
        rank = 5
    }
    Time1 = Time1 + 10000000
    TimeText = convertToText(Time1)
    if (Time1 > 16039099) {
        TimeText = "1999999"
    } else {
        TimeText2 = TimeText.substr(1, 5)
        Time1 = parseFloat(TimeText2)
        Time2 = Math.floor(Time1 / 60)
        Time1 = Time1 % 60
        Time1 = Time1 * 100
        Time2 = Time2 * 10000
        tempNumber = parseFloat(TimeText.substr(6, 7))
        TimeText = convertToText(10000000 + Time2 + Time1 + tempNumber)
    }
    music.stopAllSounds()
    animation.runImageAnimation(
    cutsceneBorders,
    assets.animation`ResultsScreen`,
    25,
    false
    )
    pause(550)
    music.play(music.createSoundEffect(WaveShape.Noise, 167, 1, 255, 170, 250, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    pause(500)
    if (currentTilemap == 4) {
        sprites.destroy(decoration2)
    }
    color.startFadeFromCurrent(color.Black, 350)
    color.pauseUntilFadeDone()
    cutsceneBorders.setImage(assets.image`BackgroundBlack`)
    cutsceneBorders.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    color.startFade(color.Black, color.originalPalette, 20)
    color.pauseUntilFadeDone()
    chatStart("Alright, let's see how   you did...", 2)
    chatEnd(2)
    stopControls = true
    pause(650)
    color.setPalette(
    color.Black
    )
    cutsceneBorders.setImage(assets.image`Results_Fade`)
    color.startFade(color.Black, color.originalPalette, 350)
    color.pauseUntilFadeDone()
    numberDisplay(1)
    color.setColor(14, color.rgb(92, 64, 108))
    color.setColor(11, color.rgb(92, 64, 108))
    color.setColor(8, color.rgb(92, 64, 108))
    color.setColor(6, color.rgb(92, 64, 108))
    color.setColor(7, color.rgb(92, 64, 108))
    color.setColor(5, color.rgb(92, 64, 108))
    cutsceneBorders.setImage(assets.image`Results_1`)
    music.play(music.createSong(assets.song`DrumRollPlease`), music.PlaybackMode.LoopingInBackground)
    if (rank <= 5) {
        color.setColor(14, color.rgb(145, 70, 61))
    }
    pause(250)
    if (rank <= 4) {
        color.setColor(11, color.rgb(164, 131, 159))
    }
    pause(250)
    if (rank <= 3) {
        color.setColor(8, color.rgb(0, 63, 173))
    }
    pause(250)
    if (rank <= 2) {
        color.setColor(6, color.rgb(36, 156, 163))
    }
    pause(250)
    if (rank <= 1) {
        color.setColor(7, color.rgb(120, 220, 82))
    }
    pause(250)
    if (rank <= 0) {
        color.setColor(5, color.rgb(255, 246, 9))
    }
    music.stopAllSounds()
    pause(500)
    if (rank == 0) {
        music.play(music.createSong(assets.song`SRank`), music.PlaybackMode.InBackground)
        chatStart("You did pretty dang well,", 2)
        renderText("Let's try to get more of those, alright?", 2)
    } else if (rank == 1) {
        music.play(music.createSong(assets.song`ARank`), music.PlaybackMode.InBackground)
        chatStart("You did pretty good", 2)
        renderText("Although, you can still  do better", 2)
    } else if (rank == 2) {
        music.play(music.createSong(assets.song`BRank`), music.PlaybackMode.InBackground)
        chatStart("You did good", 2)
        renderText("Although, you can still  do better", 2)
    } else if (rank == 3) {
        music.play(music.createSong(assets.song`CRank`), music.PlaybackMode.InBackground)
        chatStart("You did alright", 2)
        renderText("There's room for         improvement, but don't   feel bad about it", 2)
    } else if (rank == 4) {
        music.play(music.createSong(assets.song`DRank`), music.PlaybackMode.InBackground)
        chatStart("You did badly", 2)
        renderText("Try to get there as fast as possible, alright?", 2)
    } else {
        music.play(music.createSong(assets.song`F_Rank`), music.PlaybackMode.InBackground)
        chatStart("Oh...", 2)
        renderText("Hey Blake?", 2)
        renderText("Don't tell the boss aboutthis, okay?", 2)
    }
    renderText("Anyway, let's head back", 2)
    chatEnd(2)
    animation.stopAnimation(animation.AnimationTypes.All, decoration1)
    if (progress == 0) {
        progress = 1
        levelsList[0] = "Mission 2: First Job"
    }
    loadTilemap(0, 6, 14)
}
function renderText (text: string, num: number) {
    if (num == 1) {
        textSprite = textsprite.create(text, 0, 15)
    } else if (num == 2) {
        textSprite = textsprite.create(text, 9, 15)
    }
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
function cutsceneStart (num: number) {
    stopControls = true
    duringCutscene = true
    if (num == 1) {
        music.stopAllSounds()
        notInOptions = false
        color.startFade(color.originalPalette, color.Black)
        color.pauseUntilFadeDone()
        mainMenu.close()
        notInOptions = true
        scene.setBackgroundImage(assets.image`BackgroundBlack`)
        cutsceneBorders = sprites.create(assets.image`160Invis`, SpriteKind.Player)
        pause(2000)
        color.setPalette(
        color.originalPalette
        )
        animation.runImageAnimation(
        cutsceneBorders,
        assets.animation`StartCutscene`,
        600,
        false
        )
        pause(9600)
        color.startFade(color.originalPalette, color.Black, 500)
        color.pauseUntilFadeDone()
        sprites.destroy(cutsceneBorders)
        startGame()
    } else if (num == 2 && progress == 0) {
        interaction_icon.setImage(assets.image`9Invis`)
        scene.centerCameraAt(96, 38)
        animation.runImageAnimation(
        cutsceneBorders,
        assets.animation`CutsceneStart`,
        50,
        false
        )
        music.stopAllSounds()
        pause(500)
        music.play(music.createSong(assets.song`ComputerStartup`), music.PlaybackMode.InBackground)
        pause(500)
        animation.runImageAnimation(
        decoration1,
        assets.animation`Floor3Anim_1`,
        50,
        false
        )
        pause(2500)
        animation.runImageAnimation(
        decoration1,
        assets.animation`Floor3Anim_Idle`,
        100,
        true
        )
        pause(1000)
        music.play(music.createSong(assets.song`ThatEvilSmile`), music.PlaybackMode.LoopingInBackground)
        chatStart("Helllllo there!", 1)
        renderText("I assume you're the      new hire?", 1)
        renderText("Well then, Welcome to    INTEX CORPORATIONS!", 1)
        renderText("I'll get straight to the point,", 1)
        renderText("Your job is to do the    tasks we provide you with", 1)
        renderText("It's that easy!", 1)
        renderText("Since you specialize in  [PARKOUR/CLIMBING],", 1)
        renderText("We will give you jobs    that usually require", 1)
        renderText("[GOING UP TO HIGH PLACES]", 1)
        renderText("I'll pull up the [MISSIONBOARD] right away!", 1)
        color.startFade(color.originalPalette, color.Black, 200)
        color.pauseUntilFadeDone()
        chatEnd(1)
        stopControls = true
        missionboard()
    } else if (num == 2 && progress == 1) {
        interaction_icon.setImage(assets.image`9Invis`)
        scene.centerCameraAt(96, 38)
        animation.runImageAnimation(
        cutsceneBorders,
        assets.animation`CutsceneStart`,
        50,
        false
        )
        music.stopAllSounds()
        pause(500)
        music.play(music.createSong(assets.song`ComputerStartup`), music.PlaybackMode.InBackground)
        pause(500)
        animation.runImageAnimation(
        decoration1,
        assets.animation`Floor3Anim_1`,
        50,
        false
        )
        pause(2500)
        animation.runImageAnimation(
        decoration1,
        assets.animation`Floor3Anim_Idle`,
        100,
        true
        )
        pause(1000)
        music.play(music.createSong(assets.song`ThatEvilSmile`), music.PlaybackMode.LoopingInBackground)
        chatStart("Helllllo again!", 1)
        renderText("Thank you for completing your first job", 1)
        renderText("However, that was simply a practice course.", 1)
        renderText("But, you have done [GOOD ENOUGH]", 1)
        renderText("Anyway, lets get to your actual first job.", 1)
        color.startFade(color.originalPalette, color.Black, 200)
        color.pauseUntilFadeDone()
        chatEnd(1)
        stopControls = true
        missionboard()
    }
}
function distanceCheck (distance: number, sprite: Sprite) {
    if (spriteutils.distanceBetween(mySprite, sprite) <= distance) {
        return true
    } else {
        return false
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Package, function (sprite, otherSprite) {
    sprites.destroy(packageSprite)
    packageCollected = true
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Document, function (sprite, otherSprite) {
    sprites.destroy(documentSprite)
    if (!(docCollected)) {
        docsCollection.insertAt(0, miniMenu.createMenuItem("Nevermind"))
        docCollected = true
    }
    if (currentTilemap == 3 && docsCollection[1] != miniMenu.createMenuItem("Missing 1")) {
        docsCollection.insertAt(1, miniMenu.createMenuItem("Missing 1"))
    } else if (currentTilemap == 4 && docsCollection[1] != miniMenu.createMenuItem("News 1")) {
        docsCollection.insertAt(2, miniMenu.createMenuItem("News 1"))
    }
})
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
function viewDocuments () {
    renderText("Which document?", 1)
    chatOptions(docsCollection)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        if (selection == "Missing 1") {
            cutsceneBorders.z += 10
            cutsceneBorders.setImage(assets.image`Disappearance_1`)
            pauseUntil(() => !(controller.A.isPressed()))
            pauseUntil(() => controller.A.isPressed())
            cutsceneBorders.setImage(assets.image`160Invis`)
            cutsceneBorders.z += -10
        } else if (selection == "News 1") {
            cutsceneBorders.z += 10
            cutsceneBorders.setImage(assets.image`War_1`)
            pauseUntil(() => !(controller.A.isPressed()))
            pauseUntil(() => controller.A.isPressed())
            cutsceneBorders.setImage(assets.image`160Invis`)
            cutsceneBorders.z += -10
        }
        myMenu.close()
        chatEnd(1)
    })
}
function chatEnd (num: number) {
    if (num == 1) {
        animation.runImageAnimation(
        chatBox,
        assets.animation`ChatEnd`,
        50,
        false
        )
    } else if (num == 2) {
        animation.runImageAnimation(
        chatBox,
        assets.animation`ChatHoloEnd`,
        50,
        false
        )
    }
    pause(650)
    sprites.destroy(chatBox)
    stopControls = false
    pauseUntil(() => !(controller.B.isPressed()))
}
function chatOptions (options: any[]) {
    myMenu = miniMenu.createMenuFromArray(options)
    myMenu.setDimensions(152, 27)
    myMenu.setPosition(chatBox.x - 75, chatBox.y + 31)
    myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 13)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
    myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Margin, 1)
}
let ledgeAim: Sprite = null
let rank = 0
let Time2 = 0
let optionsMenu: miniMenu.MenuSprite = null
let TimeText = ""
let TimeText2 = ""
let displayNumber6: Sprite = null
let displayNumber5: Sprite = null
let displayNumber4: Sprite = null
let displayNumber3: Sprite = null
let displayNumber2: Sprite = null
let displayNumber1: Sprite = null
let displayNumbers: Image[] = []
let tempNumber = 0
let levelsList: string[] = []
let docsCollection: miniMenu.MenuItem[] = []
let parTimes: number[] = []
let interaction_icon: Sprite = null
let ledgeVelocity = 0
let ledgeGrabbed = false
let decoration2: Sprite = null
let duringCutscene = false
let Time1 = 0
let missionMenu: miniMenu.MenuSprite = null
let missionMenuBackground: Sprite = null
let documentSprite: Sprite = null
let packageSprite: Sprite = null
let mySprite: Sprite = null
let cutsceneBorders: Sprite = null
let decoration1: Sprite = null
let displaySpritesList: Sprite[] = []
let packageCollected = false
let hitbox2: Sprite = null
let hitbox1: Sprite = null
let docCollected = false
let songPreference = 0
let myMenu: miniMenu.MenuSprite = null
let talkTimes = 0
let currentTilemap = 0
let npc1: Sprite = null
let textSprite: TextSprite = null
let chatBox: Sprite = null
let stopControls = false
let mainMenu: miniMenu.MenuSprite = null
let progress = 0
let notInOptions = false
let gameStart = false
let vol = 0
vol = 180
music.setVolume(vol)
gameStart = false
notInOptions = true
progress = 0
music.play(music.createSong(assets.song`SomewhereBelow`), music.PlaybackMode.LoopingInBackground)
scene.setBackgroundImage(assets.image`Menu`)
mainMenu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Start"), miniMenu.createMenuItem("Options"), miniMenu.createMenuItem("Quit")])
mainMenuManiacalMadness(1)
mainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    if (notInOptions) {
        if (selection == "Start") {
            cutsceneStart(1)
        } else if (selection == "Options") {
            mainMenuManiacalMadness(3)
        } else if (selection == "Quit") {
            music.stopAllSounds()
            color.startFadeFromCurrent(color.Black, 1000)
            color.pauseUntilFadeDone()
            sprites.destroy(mainMenu)
            scene.setBackgroundImage(assets.image`BackgroundBlack`)
            color.setPalette(
            color.originalPalette
            )
            chatStart("You won't be leaving     anytime soon", 1)
            chatEnd(1)
            game.reset()
        }
    }
})
game.onUpdate(function () {
    if (gameStart) {
        if (!(duringCutscene)) {
            if (distanceCheck(18, npc1) && currentTilemap == 0) {
                interaction_icon.setImage(assets.image`Chat`)
                interaction_icon.setPosition(npc1.x, npc1.y - 14)
            } else if (distanceCheck(7, hitbox1) && currentTilemap == 0) {
                interaction_icon.setImage(assets.image`Enter`)
                interaction_icon.setPosition(hitbox1.x, hitbox1.y - 17)
            } else if (distanceCheck(18, npc1) && currentTilemap == 1) {
                interaction_icon.setImage(assets.image`Chat`)
                interaction_icon.setPosition(npc1.x + 1, npc1.y - 10)
            } else if (distanceCheck(7, hitbox1) && currentTilemap == 1) {
                interaction_icon.setImage(assets.image`Enter`)
                interaction_icon.setPosition(hitbox1.x + 1, hitbox1.y - 19)
            } else if (distanceCheck(7, hitbox2) && currentTilemap == 1) {
                interaction_icon.setImage(assets.image`Enter`)
                interaction_icon.setPosition(hitbox2.x + 1, hitbox2.y - 19)
            } else if (distanceCheck(18, npc1) && currentTilemap == 2) {
                interaction_icon.setImage(assets.image`Chat`)
                interaction_icon.setPosition(npc1.x, npc1.y - 14)
            } else if (distanceCheck(7, hitbox2) && currentTilemap == 2) {
                interaction_icon.setImage(assets.image`Enter`)
                interaction_icon.setPosition(hitbox2.x + 1, hitbox2.y - 19)
            } else if (distanceCheck(16, hitbox1) && currentTilemap == 2) {
                interaction_icon.setImage(assets.image`ExcamationMark`)
                interaction_icon.setPosition(hitbox1.x, hitbox1.y - 34)
            } else if (distanceCheck(10, hitbox1) && (currentTilemap == 3 || currentTilemap == 4)) {
                interaction_icon.setImage(assets.image`Enter`)
                interaction_icon.setPosition(hitbox1.x, hitbox1.y - 26)
            } else {
                interaction_icon.setImage(assets.image`9Invis`)
            }
        }
        cutsceneBorders.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    }
})
game.onUpdateInterval(5, function () {
    if (gameStart) {
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
        if (controller.left.isPressed() && controller.right.isPressed()) {
            mySprite.vx = 0
        } else if (controller.right.isPressed()) {
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
    }
})
