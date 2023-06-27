class HeadTrailer { 
  constructor(x, y, index, deepIndex){
    this.x = x;
    this.y = y;
    this.index = index;
    this.deepIndex = deepIndex;

    this.animMode = int(random(3));

    this.animY = 0;
    this.animYmax = random(-60,60);
    this.animShear = 0;
    this.animShearMax = random(-PI/4, PI/4);
    this.animScale = 1;
    this.animScaleMax = random(0.5);

    this.animWindow = coreAnimWindow;
    this.visibleOn = true;
    this.ticker = 0;

    this.letter = head.charAt(this.index%head.length);

    this.thisSize = headFontSize;

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

      if(this.animMode == 0){
        this.animY = map(easeOutExpo(tk0), 0, 1, this.animYmax, 0);
      } else if(this.animMode == 1){
        this.animShear = map(easeOutExpo(tk0), 0, 1, this.animShearMax, 0);
      } else if(this.animMode == 2){
        this.animScale = map(easeOutExpo(tk0), 0, 1, this.animScaleMax, 1);
      }
    } else {
      if(this.animMode == 0){
        this.animY = 0;
      } else if(this.animMode == 1){
        this.animShear = 0;
      } else if(this.animMode == 2){
        this.animScale = 1;
      }
    }
  }

  shrinkUpdate(){
    this.ticker ++;

    if(this.ticker <= 0){
      this.visibleOn = true;
    } else if(this.ticker < this.animWindow){
      this.visibleOn = true;
      var tk0 = map(this.ticker, 0, this.animWindow, 0, 1);

      if(this.animMode == 0){
        this.animY = map(easeInExpo(tk0), 0, 1, 0, this.animYmax);
      } else if(this.animMode == 1){
        this.animShear = map(easeInExpo(tk0), 0, 1, 0, this.animShearMax);
      } else if(this.animMode == 2){
        this.animScale = map(easeInExpo(tk0), 0, 1, 1, this.animScaleMax);
      }
    } else {
      this.visibleOn = false;
      if(this.animMode == 0){
        this.animY = this.animYmax;
      } else if(this.animMode == 1){
        this.animShear = this.animShearMax;
      } else if(this.animMode == 2){
        this.animScale = this.animScaleMax;
      }
      this.detectFinish();
    }
  }

  display(){
    textFont(headFont);
    textSize(this.thisSize);
    textAlign(CENTER);

    fill(foreColor);
    noStroke();

    push();
      translate(this.x, this.y);

      translate(0, this.animY);
      shearX(this.animShear);
      scale(this.animScale);

      text(this.letter, 0, this.thisSize * 0.35);
      // text("X", 0, 0);

    /////// DEBUG
      // noStroke();
      // fill(colorA[0]);
      // ellipse(0, 0, 5, 5);
    pop();
  }

  detectFinish(){
    if(headTrailers.length > imageTrailers.length){
      if(this.deepIndex == headTrailers.length - 1){
        fullAnimComplete = true;
      }
    }
  }
}