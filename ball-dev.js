class Ball {
  // create global variable
  static RADIUS = 5;

  constructor(x, y) {
    // create PIXI graphic
    this.graphic = new PIXI.Graphics();

    // create direction variables
    this.direction = [
      Math.random() >= 0.5 ? 1 : -1,
      Math.random() >= 0.5 ? 1 : -1
    ];
    this.x = x;
    this.y = y;

    // draw circle
    this.draw();
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
    
  }
  
  draw() {
    this.graphic.beginFill(0x000000, 1);
    this.graphic.drawCircle(0, 0, Ball.RADIUS);
    this.graphic.position.set(this.x, this.y);
  }
}