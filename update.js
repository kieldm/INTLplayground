function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function runAnimation(){
  processOn = true;
  coreTicker = 0;

  for(var m = 0; m < imageTrailers.length; m++){
    imageTrailers[m].mode = 0;
    imageTrailers[m].ticker = -m * animDelay;
  }
  for(var m = 0; m < headTrailers.length; m++){
    headTrailers[m].mode = 0;
    headTrailers[m].ticker = -m * animDelay;
  }
}

function runReset(){
  headTicker = 0;
  imageTicker = 0;

  imageTrailers = [];
  headTrailers = [];

  processOn = false;
  coreTicker = 0;
}

function setTrailMode(val){
  if(val == 0){
    imageTrailOn = true;
    headTrailOn = false;

    document.getElementById('imageTrailSettings').style.display = "block";
    document.getElementById('headlineTrailSettings').style.display = "none";
  } else if(val == 1){
    imageTrailOn = false;
    headTrailOn = true;

    document.getElementById('imageTrailSettings').style.display = "none";
    document.getElementById('headlineTrailSettings').style.display = "block";
  }
}

function setBkgdMode(val){
  if(val == 0){
    colorBkgdOn = true;
    imageBkgdOn = false;

    document.getElementById('colorBkgdSettings').style.display = "block";
    document.getElementById('imageBkgdSettings').style.display = "none";
  } else if(val == 1){
    colorBkgdOn = false;
    imageBkgdOn = true;

    document.getElementById('colorBkgdSettings').style.display = "none";
    document.getElementById('imageBkgdSettings').style.display = "block";
  }
}

function setBkgdColor(val){
  bkgdColor = color(val);
}

function setForeColor(val){
  foreColor = color(val);
}

function uploadBkgdImage(){
  const selectedFile = document.getElementById('bkgdImageUpload');
  const myImageFile = selectedFile.files[0];
  let urlOfImageFile = URL.createObjectURL(myImageFile);
  bkgdImage = loadImage(urlOfImageFile, () => {image(bkgdImage, 0, 0)});

  document.getElementById('uploadedBkgdImage').innerHTML = selectedFile.files[0].name;
  document.getElementById('uploadedBkgdImage').style.display = "block";
}

function uploadImageTrail(){
  pgImage = [];
  imageTicker = 0;

  const selectedFile = document.getElementById('imageTrailUpload');

  for(var m = 0; m < selectedFile.files.length; m ++){
    const myImageFile = selectedFile.files[m];
    let urlOfImageFile = URL.createObjectURL(myImageFile);
    pgImage[m] = loadImage(urlOfImageFile, () => {image(bkgdImage, 0, 0)});
  }

  document.getElementById('uploadedTrailImage').innerHTML = pgImage.length + " files uploaded";
  document.getElementById('uploadedTrailImage').style.display = "block";
}

function setStackMode(val){
  stackMode = val;
}

function setImageAvg(val){
  imageAvg = map(val, 5, 100, 0, 300);
}

function setImageVari(val){
  imageVar = map(val, 0, 100, 0, 2) * imageAvg;
}

function setHeadFontSize(val){
  headFontSize = map(val, 0, 100, 0, 200);
} 

function setHeadline(val){
  head = val;
  headTicker = 0;
}

function setDelay(val){
  runAnimation();

  animDelay = round(map(val, 0, 100, 0, 30));
}

function setHold(val){
  runAnimation();

  var printHold = int(map(val, 0, 100, 0, 10));

  holdDelay = printHold * 30;

  document.getElementById('holdFinal').innerHTML = printHold + "sec";
}

function setSaveSize(val){
  saveSize = val;

  if(saveSize == 0){
    resizeCanvas(windowWidth, windowHeight);
    previewFactor = 1;
  } else if(saveSize == 1){
    if(windowWidth > windowHeight * 9/16){
      resizeCanvas(windowHeight * 9/16, windowHeight);
    } else {
      resizeCanvas(windowWidth, windowWidth * 16/9);
    }
    previewFactor = 1080/width;

  } else if(saveSize == 2){
    if(windowWidth > windowHeight){
      resizeCanvas(windowHeight, windowHeight);
    } else {
      resizeCanvas(windowWidth, windowWidth);
    }
    previewFactor = 1080/width;
  }
}

function setRenderSize(){
  if(saveSize == 0){
    resizeCanvas(windowWidth, windowHeight);
  } else if(saveSize == 1){
    resizeCanvas(1080, 1920);
  } else if(saveSize == 2){
    resizeCanvas(1080, 1080);
  }
}

function runSaveImage(){
  saveStatic = true;
  setRenderSize();
}

function runSaveMotion(){
  runAnimation();

  setRenderSize();
  
  pixelDensity(1);

  cwidth = round(width/2) * 2;
  cheight = round(height/2) * 2;

  HME.createH264MP4Encoder().then(enc => {
    encoder = enc;
    encoder.outputFilename = 'INTL';
    encoder.pixelDensity = 2;
    encoder.drawingContext = "webgl";
    encoder.width = cwidth * 1;
    encoder.height = cheight * 1;
    encoder.frameRate = frate;
    encoder.kbps = 100000; // video quality
    encoder.groupOfPictures = 10; // lower if you have fast actions.
    encoder.initialize();
  })

  numFrames = round(((imageTrailers.length * animDelay) + (headTrailers.length * animDelay))/2) + coreAnimWindow + holdDelay;

  if(headTrailers.length > imageTrailers.length){
    numFrames += (headTrailers.length * animDelay) + coreAnimWindow - 2 * animDelay;
  } else {
    numFrames += (imageTrailers.length * animDelay) + coreAnimWindow - 2 * animDelay;
  }
  
  print("This is the animation length: " + numFrames);

  toggleRecMessage();

  saveMotion = true;
}

function runRecording(){
  if (saveMotion) {
    console.log('recording')

    // 2D Renderer
    encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);

    recordedFrames++
  }
  // finalize encoding and export as mp4
  if (recordedFrames === numFrames) {
    saveMotion = false;
    recordedFrames = 0;
    console.log('recording stopped');

    encoder.finalize();
    const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
    anchor.download = encoder.outputFilename;
    anchor.click();
    encoder.delete();

    toggleRecMessage();

    pixelDensity(thisDensity);

    setSaveSize(saveSize);
  }
}

function toggleRecMessage(){
  recMessageOn = !recMessageOn;

  if(recMessageOn){
    document.getElementById('recStatus').style.display = "block";
  } else {
    document.getElementById('recStatus').style.display = "none";
  }
}

