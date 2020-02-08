class Paddle {
  // global variables
  static HEIGHT = 30;
  static SPEED = 3;

  constructor(x) {
    // create graphic
    this.graphic = new PIXI.Graphics();
    // move to correct location
    this.graphic.position.x = x;

    // create variables
    this.direction = 0;
    this.frame = 0;
    this.powered = false;
    this.powerActivated = false;
    
    // draw paddle
    this.draw();
  }

  draw() {
    // black line
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    // negative y is up
    this.graphic.lineTo(0, -Paddle.HEIGHT);
  }

  move() {
    // move by direction times speed
    this.graphic.position.y += this.direction * Paddle.SPEED;
  }

  resetColor() {
    this.graphic.clear();
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    this.graphic.lineTo(0, -40);
  }

  tick() {
    this.frame++;
    if (this.movingUp) {
      this.up();
    }
    if (this.movingDown) {
      this.down();
    }
    if ((this.powered || this.powerActivated) && this.frame % 5 === 0) {
      if (this.flashing) {
        this.flashing = false;

        let color = 0x00ff00;
        if (this.powerActivated) {
          color = 0xff0000;
        }

        this.graphic.clear();
        this.graphic.lineStyle(2, color, 1);
        this.graphic.moveTo(0, 0);
        this.graphic.lineTo(0, -40);

        this.setPos();
      } else {
        this.flashing = true;

        this.graphic.clear();
        this.graphic.lineStyle(2, 0x000000, 1);
        this.graphic.moveTo(0, 0);
        this.graphic.lineTo(0, -40);

        this.setPos();
      }
    }
  }

  power() {
    this.powered = true;
  }

  activatePower() {
    if (this.powered) {
      this.powered = false;
      this.powerActivated = true;
    }
  }
}