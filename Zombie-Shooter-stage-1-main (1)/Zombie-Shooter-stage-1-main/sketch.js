var bg,bgImg
var player,shooterImg,shooter_shooting
var zombie,zombieImg
var zombieGroup
var heart1,heart1Img
var heart2,heart2Img
var heart3,heart3Img
var bulletGroup,bullets=70
var gameState="fight"

function preload(){
  bgImg = loadImage("assets/bg.jpeg")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}

function setup(){
  createCanvas(displayWidth,displayHeight)

  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1

  player = createSprite(displayWidth-1150,displayHeight-300,30,30)
  player.addImage(shooterImg)
  player.scale = 0.3
  player.debug=true
  player.setCollider("rectangle",0,0,300,300)

  zombieGroup=new Group()
  bulletGroup=new Group()
  heart1=createSprite(displayWidth-150,40,20,20)
  heart2=createSprite(displayWidth-100,40,20,20)
  heart3=createSprite(displayWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart2.addImage(heart2Img)
  heart3.addImage(heart3Img)
  heart1.scale = 0.4
  heart2.scale = 0.4 
  heart3.scale = 0.4
  heart1.visible=false
  heart2.visible=false

}


function draw(){
background("black")
if(gameState==="fight"){
  if(keyDown("UP_ARROW")){
    player.y = player.y-30
  }
  if(keyDown("DOWN_ARROW")){
    player.y = player.y+30
  }
  if(keyWentDown("space")){
    bullet=createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.velocityX=20
    bulletGroup.add(bullet)
    bullets=bullets-1
    bullet.depth=player.depth+2
    player.addImage(shooter_shooting)
  }
  else if(keyWentUp("space")){
    player.addImage(shooterImg)
  }
  if(bullets==0){
    gameState="bullet"
  
  }
  if(zombieGroup.isTouching(player)){
    for(var i=0;i<zombieGroup.length;i++){ 
      if(zombieGroup[i].isTouching(player))
      { 
        zombieGroup[i].destroy()
       }
         }
  }
  if(zombieGroup.isTouching(bulletGroup)){
    for(var i=0;i<zombieGroup.length;i++){ 
      if(zombieGroup[i].isTouching(bulletGroup))
      { 
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
       }
         }
  }
  enemy()
}
drawSprites()

if(gameState=="lost"){
  textSize(100)
  fill("red")
  text("YOU LOST",400,400)
  zombieGroup.destroyEach()
  player.destroy()
}
else if(gameState=="won"){
  textSize(100)
  fill("blue")
  text("YOU WIN",400,400)
  zombieGroup.destroyEach(
    player.destroy()
  )
}else if(gameState=="bullet"){
textSize(100)
fill("yellow")
text("OUT OF BULLET",400,400)
zombieGroup.destroyEach()
  bulletGroup.destroyEach()
  player.destroy()


}


}

function enemy(){
  if(frameCount%50===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.velocityX = -3
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.debug=true
    zombie.setCollider("rectangle",0,0,400,400)
    zombieGroup.add(zombie)

  }
}