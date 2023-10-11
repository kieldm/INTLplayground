var bkgdColor, foreColor, headBlock;
var colorA = [];

var trailOn = false;
var headTrailOn = false;
var imageTrailOn = true;

var colorBkgdOn = true;
var imageBkgdOn = false;
var bkgdImage;

var imageTrailers = [];
var headTrailers = [];
var imageTicker = 0;
var headTicker = 0;

var pgImage = [];
var pgImageHoldCount = 40;

var trailPace = 3;

var head = "INTL 2023";
var headFontSize = 100;
var headFont;

var coreAnimWindow = 60;

///// SLIDERS HERE
var overlapFactor = 0.6; 
var imageAvg = 100;
var imageVar = imageAvg * 0.5;

var imageAnimate = true;
var imageBreak = false;
var imageRandomize = false;

var headScaleAnim = false;
var headSkewAnim = false;
var headVertAnim = false;
var headlineBlock = true;

var animDelay = 5;
var holdDelay = 60;

var stackMode = 1;

var processOn = false;
var coreTicker = 0;

var fullAnimComplete = false;
var previewFactor = 1;

var saveStatic = false;
var saveMotion = false;
var recordedFrames = 0;
var numFrames = 500;
var thisDensity = 1;
var frate = 30;

var saveSize = 0;
var widgetOn = true;
let recMessageOn = false;

function preload(){
  for(var m = 0; m < pgImageHoldCount; m++){
    pgImage[m] = loadImage("resources/imageTrail/File " + m + ".jpg");
  }
  bkgdImage = loadImage("resources/glencoe.jpg");
  headFont = loadFont("resources/NHaasGroteskDSPro-65Md.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  frameRate(frate);
  thisDensity = pixelDensity();

  bkgdColor = color('#ffffff');
  foreColor = color('#0000ff');  
  headBlock = color('#e2e2e2');  

  rectMode(CENTER);
  imageMode(CENTER);
}

function draw(){
  background(bkgdColor);

  if(imageBkgdOn){
    image(bkgdImage, width/2, height/2, width, height);
  }

  if(saveStatic || saveMotion){
    scale(previewFactor);
  }
  
  if(stackMode == 0){
    for(var m = imageTrailers.length - 1; m >= 0; m--){
      imageTrailers[m].run();
    }
  } else {
    for(var m = 0; m < imageTrailers.length; m++){
      imageTrailers[m].run();
    }
  }

  for(var m = 0; m < headTrailers.length; m++){
    headTrailers[m].run();
  }

  if(imageTrailOn &&
    trailOn &&
    dist(imageTrailers[imageTrailers.length-1].x, imageTrailers[imageTrailers.length-1].y, mouseX, mouseY) >= (imageTrailers[imageTrailers.length-1].rMax * overlapFactor))
    {
    imageTrailers[imageTrailers.length] = new ImageTrailer(mouseX, mouseY, imageTicker, imageTrailers.length);
    imageTicker ++;

    ///////// NATURAL BREAK
    if(imageBreak && imageTicker%pgImage.length == 0){
      trailOn = false;
    }
  }

  if(headTrailOn &&
    trailOn &&
    dist(headTrailers[headTrailers.length-1].x, headTrailers[headTrailers.length-1].y, mouseX, mouseY) >= headFontSize * 0.75)
    {
    headTrailers[headTrailers.length] = new HeadTrailer(mouseX, mouseY, headTicker, headTrailers.length);
    headTicker ++;
//    if(headTrailers.length%head.length == 0){
    if(headTicker%head.length == 0){
      trailOn = false;
    }
  }

  if(processOn){
    coreTicker ++;
  }

  if(coreTicker == round(((imageTrailers.length * animDelay) + (headTrailers.length * animDelay))/2) + coreAnimWindow + holdDelay ){
    runOutro();
  }

  if(fullAnimComplete){
    coreTicker = 0;
    runAnimation();
    fullAnimComplete = false;
  }

  if(saveStatic){
    save('INTL_static.jpg');

    setSaveSize(saveSize);
    saveStatic = false;
  }

  runRecording();
  // textSize(10);
  // text(coreTicker, width - 100, height - 100);
}

function runOutro(){
  for(var m = 0; m < imageTrailers.length; m++){
    imageTrailers[m].mode = 1;
    imageTrailers[m].ticker = -m * animDelay;;
  }

  for(var m = 0; m < headTrailers.length; m++){
    headTrailers[m].mode = 1;
    headTrailers[m].ticker = -m * animDelay;;
  }
}

function mousePressed(){
  // processOn = true;
  var mouseOn = true;

  if(mouseX < 210 - (windowWidth - width)/2 && mouseY < 500 - (windowHeight - height)/2){
    mouseOn = false;
  }

  if(mouseY > height-40){
    mouseOn = false;
  }

  if(mouseOn){
    if(imageTrailOn){
      imageTrailers[imageTrailers.length] = new ImageTrailer(mouseX, mouseY, imageTicker, imageTrailers.length);
      imageTicker ++;
    } else if(headTrailOn){
      headTrailers[headTrailers.length] = new HeadTrailer(mouseX, mouseY, headTicker, headTrailers.length);
      headTicker ++;
    }
    trailOn = true;
  }
}

function windowResized(){
  if(saveSize == 0){
    resizeCanvas(windowWidth, windowHeight);
  } else if(saveSize == 1){
    if(windowWidth > windowHeight * 9/16){
      resizeCanvas(windowHeight * 9/16, windowHeight);
    } else {
      resizeCanvas(windowWidth, windowWidth * 16/9);
    }
  } else if(saveSize == 2){
    if(windowWidth > windowHeight){
      resizeCanvas(windowHeight, windowHeight);
    } else {
      resizeCanvas(windowWidth, windowWidth);
    }
  }
}

function mouseReleased(){
  trailOn = false;
}