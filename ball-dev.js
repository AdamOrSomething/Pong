class Ball {
  // create global variable
  static RADIUS = 5;
  static SPEED = 3;
  
  constructor(x, y) {
    // create PIXI graphic
    this.graphic = new PIXI.Graphics();
    
    // create coordinate variables
    this.direction = {
      x: Math.random() >= 0.5 ? 1 : -1,
      y: Math.random() >= 0.5 ? 1 : -1
    };
    this.x = x;
    this.y = y;
    this.coords = {};
    
    // initialize coords
    this.updateCoords();
    
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
  
  move() {
    // update x and y
    this.x += this.direction.x * Ball.SPEED;
    this.y += this.direction.y * Ball.SPEED;
    
    this.graphic.position.set(this.x, this.y);
    this.updateCoords();
  }
  
  updateCoords() {
    // empty object
    this.coords = {
      ballBottom: {},
      ballTop: {},
      ballLeft: {},
      ballRight: {}
    };
    
    // fill with default values (the coords of ball center)
    for (let coord in this.coords) {
      this.coords[coord].x = this.x;
      this.coords[coord].y = this.y;
    }
    
    // adjust values
    this.coords.ballBottom.y = this.y - Ball.RADIUS;
    this.coords.ballTop.y = this.y + Ball.RADIUS;
    this.coords.ballLeft.x = this.x - Ball.RADIUS;
    this.coords.ballRight.x = this.x + Ball.RADIUS;
  }
}