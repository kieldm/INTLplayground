var bkgdColor, foreColor;
var colorA = [];

var trailOn = false;
var headTrailOn = false;
var imageTrailOn = true;

var imageTrailers = [];
var headTrailers = [];

var pgImage = [];
var jpgCount = 21;
var pngCount = 8;
var gifCount = 1;

var trailPace = 3;

var widgetOn = true;

var head = "MOUTHWASH";
var headFontSize = 100;
var headFont;

///// SLIDERS HERE
var overlapFactor = 0.6; 
var imageAvg = 100;
var imageVar = imageAvg * 0.5;

var animDelay = 5;

function preload(){
  for(var m = 0; m < jpgCount; m++){
    pgImage[pgImage.length] = loadImage("resources/imageTrail/mouthwash/jpg" + m + ".jpg");
  }
  for(var m = 0; m < pngCount; m++){
    pgImage[pgImage.length] = loadImage("resources/imageTrail/mouthwash/png" + m + ".png");
  }
  for(var m = 0; m < gifCount; m++){
    pgImage[pgImage.length] = loadImage("resources/imageTrail/mouthwash/gif" + m + ".gif");
  }

  headFont = loadFont("resources/NHaasGroteskDSPro-65Md.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  bkgdColor = color('#ffffff');
  foreColor = color('#000000');  

  colorA[0] = color('#0000ff');
  colorA[1] = color('#b9b9b9');

  imageMode(CENTER);
}

function draw(){
  background(bkgdColor);

  // for(var m = 0; m < imageTrailers.length; m++){
  //   imageTrailers[m].run();
  // }

  for(var m = imageTrailers.length - 1; m >= 0; m--){
    imageTrailers[m].run();
  }

  for(var m = 0; m < headTrailers.length; m++){
    headTrailers[m].run();
  }

  if(imageTrailOn && trailOn && dist(imageTrailers[imageTrailers.length-1].x, imageTrailers[imageTrailers.length-1].y, mouseX, mouseY) >= (imageTrailers[imageTrailers.length-1].rMax * overlapFactor)){
    imageTrailers[imageTrailers.length] = new ImageTrailer(mouseX, mouseY, imageTrailers.length);
  }

  if(headTrailOn && trailOn && dist(headTrailers[headTrailers.length-1].x, headTrailers[headTrailers.length-1].y, mouseX, mouseY) >= headFontSize * 0.75){
    headTrailers[headTrailers.length] = new HeadTrailer(mouseX, mouseY, headTrailers.length);
    if(headTrailers.length%head.length == 0){
      trailOn = false;
    }
  }

  // textSize(12);
  // text(int(frameRate()), width - 100, height - 100);
  // text(headTrailers.length, width - 100, height - 70);
}

function mousePressed(){
  var mouseOn = true;

  if(mouseX < 210 && mouseY < 400){
    mouseOn = false;
  }

  if(mouseY > height-20){
    mouseOn = false;
  }

  if(mouseOn){
    if(imageTrailOn){
      imageTrailers[imageTrailers.length] = new ImageTrailer(mouseX, mouseY, imageTrailers.length);
    } else if(headTrailOn){
      headTrailers[headTrailers.length] = new HeadTrailer(mouseX, mouseY, headTrailers.length);
    }
    trailOn = true;
  }
}

function mouseReleased(){
  trailOn = false;
}