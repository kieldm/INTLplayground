function hideWidget(){
  widgetOn = !widgetOn;

  if(widgetOn){
    document.getElementById('widget').style.display = "block";
  } else {
    document.getElementById('widget').style.display = "none";
  }
}

function runAnimation(){
  for(var m = 0; m < imageTrailers.length; m++){
    imageTrailers[m].ticker = -m * animDelay;
  }
  for(var m = 0; m < headTrailers.length; m++){
    headTrailers[m].ticker = -m * animDelay;
  }
}

function runReset(){
  imageTrailers = [];
  headTrailers = [];
}

function setDelay(val){
  animDelay = map(val, 0, 100, 0, 20);
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
  print("New headline: " + head);
}

function setStudio(val){

}

function sizeSaveChange(val){

}

function runSaveImage(){

}

function runSave(){
  
}
