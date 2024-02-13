namespace SpriteKind {
    export const Star = SpriteKind.create()
}
function placeEnemy () {
    enemySprite = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
    enemySprite.setPosition(160, randint(0, 120))
    enemySprite.setVelocity(randint(-40, -60), 0)
    enemySprite.setFlag(SpriteFlag.AutoDestroy, true)
}
function fireLaser () {
    projectile = sprites.createProjectileFromSprite(assets.image`laser`, mySprite, 200, 0)
    projectile.setFlag(SpriteFlag.AutoDestroy, true)
}
function placeStar () {
    starSprite = sprites.create(assets.image`star`, SpriteKind.Star)
    starSprite.setPosition(160, randint(0, 120))
    starSprite.setVelocity(randint(-120, -160), 0)
    starSprite.z = -1
    starSprite.setFlag(SpriteFlag.AutoDestroy, true)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fireLaser()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    dealPlrDamage(50)
    sprite.destroy()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite, effects.fire, 500)
})
let starSprite: Sprite = null
let projectile: Sprite = null
let enemySprite: Sprite = null
let mySprite: Sprite = null
let healthPoints = 100
let healthPotions = 0
let HEALTH_POTION_AMOUNT = 25
mySprite = sprites.create(assets.image`spaceship`, SpriteKind.Player)
mySprite.setPosition(12, 60)
controller.moveSprite(mySprite, 0, 100)
game.onUpdateInterval(1000, function () {
    placeEnemy()
})
game.onUpdateInterval(200, function () {
    placeStar()
})
function dealPlrDamage(amount: number)
{
    let newHP = healthPoints - amount
    if (newHP <= 0)
    {
        game.gameOver(false)
    }
    else {
        healthPoints = newHP
    }
    // TODO: UPDATE HEALTH BAR
}