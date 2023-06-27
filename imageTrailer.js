class ImageTrailer { 
  constructor(x, y, index, deepIndex){
    this.x = x;
    this.y = y;
    this.index = index;
    this.deepIndex = deepIndex;

    // this.rImage = pgImage[int(random(pgImage.length))];
    this.rImage = pgImage[(this.index%pgImage.length)];
    this.d = (this.rImage.width + this.rImage.height)/2;
    this.dwFactor = this.rImage.width/this.d;
    this.dhFactor = this.rImage.height/this.d;

    this.r = 0;
    this.w = this.r * this.dwFactor;
    this.h = this.r * this.dhFactor;
    this.rMax = imageAvg + random(-imageVar, imageVar);

    this.animWindow = coreAnimWindow;
    this.visibleOn = true;
    this.ticker = 0;

    this.mode = 0;
  }

  run(){
    if(this.mode == 0){
      this.growUpdate();
    } else if(this.mode == 1){
      this.shrinkUpdate();
    }
    if(this.visibleOn){
      this.display();
    }
  }

  growUpdate(){
    this.ticker ++;

    if(this.ticker <= 0){
      this.visibleOn = false;
    } else if(this.ticker < this.animWindow){
      this.visibleOn = true;
      var tk0 = map(this.ticker, 0, this.animWindow, 0, 1);
      this.r = map(easeOutQuint(tk0), 0, 1, 0, this.rMax);
    } else {
      this.r = this.rMax;
    }

    this.w = this.r * this.dwFactor;
    this.h = this.r * this.dhFactor;
  }

  shrinkUpdate(){
    this.ticker ++;

    if(this.ticker <= 0){
      this.visibleOn = true;
    } else if(this.ticker < this.animWindow){
      var tk0 = map(this.ticker, 0, this.animWindow, 0, 1);
      this.r = map(easeInExpo(tk0), 0, 1, this.rMax, 0);
    } else {
      this.r = 0;
      this.visibleOn = false;
      this.detectFinish();
    }

    this.w = this.r * this.dwFactor;
    this.h = this.r * this.dhFactor;
  }

  display(){
    push();
      translate(this.x, this.y);

      image(this.rImage, 0, 0, this.w, this.h);

    ///////// DEBUG
    //   noStroke();
    //   fill(colorA[0]);
    //   ellipse(0, 0, 5, 5);
  
    //   stroke(200);
    //   noFill();
    //   ellipse(0, 0, this.r, this.r);
    pop();
  }

  detectFinish(){
    if(imageTrailers.length > headTrailers.length){
      if(this.deepIndex == imageTrailers.length - 1){
        fullAnimComplete = true;
      }
    }
  }
}