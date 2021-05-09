var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var move, gameover;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  move = loadSound("move.mp3");
  gameover = loadSound("gameover.m4a");
}

function setup() {
  createCanvas(1200, 800);
  
  //creating background
  background = createSprite(0,0,800,10);
  background.addImage(backgroundImage);
  background.scale = 3
  
  // creating bow to shoot arrow
  bow = createSprite(1000,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 0.3;
  
  redB= new Group()
  pinkB= new Group()
  blueB= new Group()
  greenB= new Group()
  arrowGroup= new Group()
  
   score = 0  
  
}

function draw() {

  // moving ground
    background.velocityX = -15

    if (background.x < 0){
      background.x = background.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
    
  }
  
  //creating continous enemies
  var select_balloon = Math.round(random(1,3));
  
  if (World.frameCount % 10 === 0) {
    if (select_balloon === 1) {
      greenBalloon();
    } else if (select_balloon === 2) {
      blueBalloon();
    } else if (select_balloon === 3) {
      pinkBalloon();
    } 
  }

  if (World.frameCount % 150 === 0) {
    redBalloon();
  }

if(arrowGroup.isTouching(redB)){
  score=0
  stop();
  }
  
  if(arrowGroup.isTouching(greenB)){
  greenB.destroyEach()
  arrowGroup.destroyEach()
  score=score+2
  move.play();
  }
  
  if(arrowGroup.isTouching(blueB)){
  blueB.destroyEach()
  arrowGroup.destroyEach()
  score=score+2
  move.play();
  }
  
  if(arrowGroup.isTouching(pinkB)){
  pinkB.destroyEach()
  arrowGroup.destroyEach()
  score=score+2
  move.play();
  }
  

  
  drawSprites();
   
  textSize(25);
  fill("black")
  text("SCORE : " + score, 800,30);
  text("Target: 100 " ,100,30);
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(100,700)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 15;
  red.lifetime = 150;
  red.scale = 0.02;
  redB.add(red)
  return red
  
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(100, 700)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 15;
  blue.lifetime = 150;
  blue.scale = 0.02;
  blueB.add(blue)
  return blue;
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(100, 700)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 15;
  green.lifetime = 150;
  green.scale = 0.02;
  greenB.add(green)
  return green;   
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(100, 700)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 15;
  pink.lifetime = 150;
  pink.scale = 0.3
  pinkB.add(pink)
  return pink;
}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(920, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.y=bow.y;
  arrow.velocityX = -15;
  arrow.lifetime = 150;
  arrow.scale = 0.4;
  arrowGroup.add(arrow)
  return arrow;
   
}

function stop(){
redB.destroyEach();
blueB.destroyEach();
greenB.destroyEach();
pinkB.destroyEach();
arrowGroup.destroyEach();
gameover.play();
}