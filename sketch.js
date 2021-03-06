var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg,zombieGroup;
var life=3;
var score=0;
var bullets=20;
var bullet;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

zombieGroup=createGroup();
}

function draw() {
  background(0); 



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(zombieGroup.isTouching(player)){
  life=life-1;
  for(var i=0; i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy();
    }
  
  }
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  if(bullets>=1){
    bullet=createSprite(player.x,player.y,15,5);
    player.addImage(shooter_shooting)
   bullet.velocityX=3;
   bullets=bullets-1;
   if(zombieGroup.isTouching(bullet)){
    score=score+1;
  
     for(var i=0; i<zombieGroup.length;i++){
       if(bullet.isTouching(zombieGroup[i])){
       zombieGroup[i].destroy();
       
       }
     
     }
   }
  }
 
}

if(score>0 && score%5==0){
  bullets=bullets+1
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg);
  
}
spownzombie();
drawSprites();
textSize(25);
fill("white");
text("life= "+life,50,50);
text("score: "+score ,200,50);
text("bullets left: "+bullets,350,50);
}

function spownzombie(){
  if(frameCount%100==0){
    zombie=createSprite(windowWidth,windowHeight/2,100,100);
    zombie.addImage(zombieImg);
    zombie.scale=0.3;
    zombie.velocityX = -5;
    zombie.lifetime=800;
    zombie.debug=true;
    zombie.setCollider("rectangle",0,0,300,800);
    zombieGroup.add(zombie);
  }
}
