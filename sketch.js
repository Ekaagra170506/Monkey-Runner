var bananaImage,obstacleImage,obstaclegroup,backgroundImage;
var score=0,MonkeyImage,backimage,ground,monkey,bananagroup;
var banana,i=0,out=0;
var PLAY=1,END=0,gamestate=PLAY

function preload(){
  backgroundImage=loadImage("jungle.jpg");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
MonkeyImage=
loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(500,200);
    backimage = createSprite(10,1,100,100);
   backimage.addImage("running", backgroundImage);
   backimage.velocityX=-4;

   monkey = createSprite(200,170,20,50);
    monkey.addAnimation("monkey",MonkeyImage);
    monkey.scale=0.08;
    monkey.x = 50;  

  
   ground = createSprite(200,195,400,5);
  ground.visible=false;
  
  bananagroup= new Group();
  obstaclegroup= new Group();
}

function draw() {
  background(220);
  
  if(gamestate===PLAY){
  food();
  obstacle();
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>140) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.6;
  
  if(backimage.x<0){
    backimage.x=backimage.width/2;
  }
  }
  if(obstaclegroup.isTouching(monkey)&&gamestate===PLAY){
    monkey.scale=0.08
    i=0;
    out++;
    if(out===1){ 
    obstaclegroup.destroyEach();
  }
  }
  if(out===2&&gamestate===PLAY){
    monkey.scale=0.08
    i=0;
    gamestate=END;
  }
  if(gamestate===END){
    backimage.velocityX=0;
    bananagroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.setLifetimeEach(-1);
    monkey.velocityY =0;
  }
  
  
  if(bananagroup.isTouching(monkey)){
    score=score+2;
    i=i+2;
    bananagroup.destroyEach();
  }
  
  switch(i){
    case 10:monkey.scale=0.10;break;
    case 20:monkey.scale=0.12;break;
    case 30:monkey.scale=0.14;break;
    default:break;
  }
  
  drawSprites();
  stroke("white");
  textSize(18);
  fill("white");
  text("Score: "+score,360,30)
}
function food() { 
  if(frameCount%100===0){
      var banana = createSprite(500,320,40,10);
    banana.scale=1;
    banana.y = Math.round(random(100,120));
    banana.addImage(bananaImage);
    banana.scale=0.04;
    banana.velocityX = -4;
    banana.lifetime =126;


    bananagroup.add(banana);
  } 
}
function  obstacle() { 
  if(frameCount%160===0){
    var obs = createSprite(500,170,40,10);
    obs.addImage(obstacleImage);
    obs.scale=0.1;
    obs.velocityX = -4;
    obs.lifetime =126;


    obstaclegroup.add(obs);
  } 
}