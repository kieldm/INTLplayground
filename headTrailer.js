class HeadTrailer { 
  constructor(x, y, index){
    this.x = x;
    this.y = y;
    this.index = index;

    this.animMode = int(random(3));

    this.animY = 0;
    this.animYmax = random(-60,60);
    this.animShear = 0;
    this.animShearMax = random(-PI/4, PI/4);
    this.animScale = 1;
    this.animScaleMax = random(0.5);

    this.animWindow = 60;
    this.visibleOn = true;
    this.ticker = 0;

    this.letter = head.charAt((this.index)%(head.length));
  }

  run(){
    this.update();
    if(this.visibleOn){
      this.display();
    }
  }

  update(){
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

  display(){
    textFont(headFont);
    textSize(headFontSize);
    textAlign(CENTER);

    push();
      translate(this.x, this.y);

      translate(0, this.animY);
      shearX(this.animShear);
      scale(this.animScale);

      fill(colorA[0]);
      noStroke();
      text(this.letter, 0, headFontSize * 0.35);
      // text("X", 0, 0);

    /////// DEBUG
      // noStroke();
      // fill(colorA[0]);
      // ellipse(0, 0, 5, 5);
    pop();
  }
}