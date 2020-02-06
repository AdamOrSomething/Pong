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
      this.x -= 3;
      if (this.x - 5 <= 0) {
        this.endGame = true;
      }
    } else {
      this.x += 3;
      if (this.x + 5 >= this.width) {
        this.endGame = true;
      }
    }
    if (this.movingUp) {
      this.y -= 3;
      if (this.y - 5 <= 0) {
        this.movingUp = false;
      }
    } else {
      this.y += 3;
      if (this.y + 5 >= this.height) {
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