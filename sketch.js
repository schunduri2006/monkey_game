var obstaclesGroup,score, ground, bananasGroup, monkey, banana, rock, gamestate,gameOverScreen

score = 0;

function preload(){
 player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
 bananaImage = loadImage("banana.png")
 backImage = loadImage("jungle.jpg")
obstacleImage = loadImage("stone.png")
}


function setup() {

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  createCanvas(600,300);
  
  
  Background = createSprite(600,150,600,300);
  Background.scale = (1.2);
 
Background.addImage(backImage);
 Background.velocityX = -6
  Background.scope = (background)
  
  ground = createSprite(300,300,600,10);
  ground.visible = false
  
  monkey = createSprite(34,260,30,30);
  monkey.addAnimation("running",player_running)

}


function draw(){
  gamestate = "play";
  background("white");
  background(0);
  if(gamestate === "play"){
    if(Background.x < 0){
      Background.x = 300
    }
    monkey.collide(ground);
 
    if(keyDown("space") && monkey.y > 260){
      monkey.velocityY = -10;
    }
   
    monkey.velocityY = monkey.velocityY + 0.5;
    
  
    
    switch(score){
      case 0: monkey.scale = 0.10
        break;
      case 10: monkey.scale = 0.11
        break;
        case 20: monkey.scale = 0.12
        break;
      case 30: monkey.scale = 0.13
        break;
        case 40: monkey.scale = 0.14
        break;
      default: break;
        
    }
    
  
    if(monkey.isTouching(bananasGroup)){
      score = score+2
      bananasGroup.destroyEach();
    }
  
   
    spawnBananas();
    spawnObstacles();
   
  }


  

  if(monkey.isTouching(bananasGroup)){
    score = score+2
    bananasGroup.destroyEach();
  }

  if(monkey.isTouching(obstaclesGroup)){
    gamestate = "end";
    
  }
 
  

  
drawSprites();

stroke("white");
textSize(20);
fill("white");
text("Score: "+ score,100,50);

if(gamestate === "end"){
  monkey.scale = 0.1
  Background.velocityX = 0;
  monkey.velocityX = 0;
  monkey.pause();
  
  obstaclesGroup.setVelocityXEach(0);
  bananasGroup.setVelocityXEach(0);
  stroke("white");
textSize(40);
fill("white");
  text("GAME OVER",180,200);
  
 }
}



function spawnBananas(){
  
  if(frameCount%120===0){
    banana = createSprite(650,random(monkey.scale*1600,monkey.scale*1800));
   banana.addImage(bananaImage);
    banana.scale = (0.05);
    banana.velocityX = -6;
    banana.setlifetime = 200;
    bananasGroup.add(banana);
   
  }
  
}

function spawnObstacles(){
  if(frameCount%200===0){
    rock = createSprite(650,275,20,20);
   rock.addImage(obstacleImage);
    rock.scale = (0.15);
    rock.velocityX = -6;
    rock.setlifetime = 200;
    obstaclesGroup.add(rock);
  }
}  
