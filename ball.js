class Ball {
  constructor(width, height) {
    this.movingLeft = Math.random() >= 0.5;
    this.movingUp = Math.random() >= 0.5;
    this.x = width / 2;
    this.y = height / 2;
    this.width = width;
    this.height = height;
    this.graphic = new PIXI.Graphics();
  }
  
  tick() {
    if (this.movingLeft) {
      if (--this.x === 0) {
        this.movingLeft = false;
      }
    } else {
      if (++this.x === this.width) {
        this.movingLeft = true;
      }
    }
    if (this.movingUp) {
      if (--this.y === 0) {
        this.movingUp = false;
      }
    } else {
      if (++this.y === this.height) {
        this.movingUp = true;
      }
    }
    this.graphic.position.set(this.x, this.y);
  }
  
  render(stage) {
    this.graphic.beginFill(0x000000, 1);
    this.graphic.drawCircle(0, 0, 5);
    
    stage.addChild(this.graphic);
  }
}