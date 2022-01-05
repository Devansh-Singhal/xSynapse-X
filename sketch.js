var player, playerimg;
var gameState = "wait";
var play;
var Mainmenu,playimg;
var titleimg;
var starbg;
var enemyimg,enemy;
var explo;
var lasersGroup, enemyGroup;
var bombGroup;
var bombimg;
var score1=0
var score=0
var life=3
function preload() {
 // playerimg = loadImage("images/run1png.png");
//  towerimg = loadImage("tower.png");
playerimg=loadImage("images/Ship.png")
Mainmenu=loadImage("images/Mainimg.jpg")
starbg=loadImage("images/spacebg.jpg")
enemyimg=loadImage("images/Alien.png")
//titleimg=loadImage("images/Name.png")
laserimg=loadAnimation("images/laser1.png","images/laser2.png")
//,"images/laser3.png","images/laser4.png","images/laser5.png","images/laser6.png")
explo=loadAnimation("images/explosion/1.png","images/explosion/2.png")
//,"images/explosion/3.png","images/explosion/4.png","images/explosion/5.png","images/explosion/6.png","images/explosion/7.png","images/explosion/8.png","images/explosion/9.png","images/explosion/10.png","images/explosion/11.png","images/explosion/12.png")
bombimg=loadImage("images/bomb.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
   player = createSprite(windowWidth/2, windowHeight-150, 50, 50);
  player.addImage(playerimg)
  player.visible=false
  player.scale=0.3

  play=createImg("images/Start.png")
play.position(windowWidth/2-400,windowHeight-200)
play.size(300,100)  
about=createImg("images/About.png")
about.position(windowWidth/2+200,windowHeight-200)
about.size(300,100)

  titleimg=createImg("images/Name.png")
  titleimg.position(windowWidth/2-300,windowHeight/2-200)
  titleimg.size(600,200)
  titleimg.hide()


back=createImg("images/home.png")
back.position(windowWidth/2+200,windowHeight-200)
back.size(300,100)
back.hide()

b1=createSprite(windowWidth/2,0,windowWidth,10)
b2=createSprite(windowWidth/2,windowHeight-10,windowWidth,10)
b3=createSprite(0,windowHeight/2,10,windowHeight)
b4=createSprite(windowWidth-5,windowHeight/2,10,windowHeight)
b1.visible=false
b2.visible=false
b3.visible=false
b4.visible=false
lasersGroup= new Group()
enemyGroup=new Group()
bombGroup = new(Group)
}

function draw() {
 

  if(gameState==="wait"){
background(Mainmenu)
titleimg.show()
about.show()
play.show()
back.hide()
  }

//mousepressed on play button
 play.mousePressed(()=>{
   gameState="play"
 
 play.hide()
 titleimg.hide()
 about.hide()
 })


//mouse pressed on about button
about.mousePressed(()=>{
  gameState="about"
  about.hide()
  titleimg.hide()
  back.show()
  play.hide()
})
back.mousePressed(() => {
  gameState="wait"

  
})

 

  if (gameState === "play") {
    background(starbg)
    spawnenemy()
    player.visible=true
    enemy.visible=true
    
    if (keyDown("UP_ARROW")) {
      player.y -=10;
      //laser.visible=false

    }

    if (player.isTouching(b1 )|| player.isTouching(b2) ||   player.isTouching (b3) || player.isTouching(b4)){
      if(player.isTouching(b1 )){
        player.collide(b1)
      }
      if(player.isTouching(b2)){
        player.collide(b2)
      }
      if(player.isTouching(b3)){
        player.collide(b3)
      }
      if(player.isTouching(b4)){
        player.collide(b4)
      }
    }

   // guntest.x = player.x;
   // guntest.y = player.y;
    if (keyDown("LEFT_ARROW")) {
       player.x = player.x - 15;
     // player.velocityX= player.velocityX - 1;
   
    }
    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 15;
     // laser.visible=false

    }
    if (keyDown("DOWN_ARROW")) {
      player.y = player.y + 10;
      //laser.visible=false
    }
    if (keyDown("space")) {

      spawnlaser()
      
    

    }

for(i=0;i<=(lasersGroup.length-1);i++){
    for(z=0;z<=(enemyGroup.length-1);z++){
    
    if(lasersGroup.get(i).isTouching(enemyGroup.get(z))){
      score1 +=1
      score=Math.round(score1/10)
      //lasersGroup.get(i).remove()
    enemyGroup.get(z).remove()
      
    }
   
  }

  if(score>=50){
    gameState="win"
  }

   
  }
  for(b=0;b<=(bombGroup.length-1);b++){
    if(player.isTouching(bombGroup.get(b))){
      life -=1
      bombGroup.get(i).destroy()
    }  

if(life<=0){
  gameState="end"
}

  }
  }

  
  if (gameState == "end") {
    //tower.visible = false;
    background("black");
    player.visible = false;
    bombGroup.destroyEach()
    enemyGroup.destroyEach()
    textSize(100);
    fill("yellow");
    strokeWeight(10)
    stroke("red")
    text("Game Over!", windowWidth/4, windowHeight/2);
  }

  drawSprites();

  if (gameState == "win") {
    //tower.visible = false;
    //background("black");
    //player.visible = false;
    bombGroup.destroyEach()
    enemyGroup.destroyEach()
    textSize(100);
    fill("yellow");
    strokeWeight(10)
    stroke("red")
    text("You Win!", windowWidth/4, windowHeight/2);
  }
 // textSize(20);
  //fill("red");
 //text(mouseX + "," + mouseY, mouseX, mouseY)


if (gameState==="play" ){
  textSize(30)
  fill(255)
  text("Score : "+score,20,50)
  text("Lives: "+life,windowWidth-150,50)
}
    
 
//textSize(150)
//stroke("green")
//strokeWeight(7)
//fill("white")
/////text("Space Fighters" ,100,windowHeight/2)
 

 if(gameState==="about"){
   
  textSize(30)
 // stroke("green")
 // strokeWeight(7)
  fill("white")
  text("This is a game where you are the pilot  of a spaceship \n and you have to protect your planet from the incoming aliens who want to destroy it \nPress up arrow to go up, down arrow to go down and right and left arrow to go right and left respectively.\n Press space to shoot a laser to kill   the enemies. \nYour objective of the game is to kill all the enemies before they reach your ship \n and leave your planet helpless.\n \n Good luck Pilot" ,100,100)
   }

 
}

function spawnlaser(){
  if(frameCount %10 ==0){
  laser=createSprite(player.x,player.y-(player.height/6))
  laser.addAnimation("lasershoot",laserimg)
  laser.scale=0.15
    laser.x=player.x
  laser.y=player.y-(player.height/6)
  laser.velocityY=-20
  
  laser.lifetime=(windowWidth/laser.velocityY)
lasersGroup.add(laser)

}


}

function spawnenemy(){
 
 for(i=200;i<=windowWidth-200; i=i+100){
  for(a=50;a<=300;a=a+65){
  enemy= createSprite(i,a);
enemy.addImage(enemyimg)
enemy.scale=0.25

enemyGroup.add(enemy)

}
}
if(frameCount %25==0){
  
  pos=enemyGroup.get(enemyGroup.length-1)
 
  bomb=createSprite(pos.x,windowHeight/3,50,50)
  bomb.addImage(bombimg)
  bomb.scale=0.04
  bomb.x=Math.round(random(200,windowWidth-200))
 bomb.velocityY= 5
 //bomb.debug=true
 bomb.setCollider("circle",0,0,10)
bomb.lifetime=(windowWidth/bomb.velocityY)
bombGroup.add(bomb)


}
}








  






































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































//Hi