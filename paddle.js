class Paddle {
  constructor(height, x) {
    this.height = height;
    this.x = x;
    this.bottomY = this.height / 2 - 10;
    this.graphic = new PIXI.Graphics();
    this.frame = 0;
    this.powered = false;
    this.powerActivated = false;
  }

  up() {
    if (this.bottomY - 30 > 0) {
      this.bottomY -= 3;
    }
    this.setPos();
  }

  down() {
    if (this.bottomY < this.height) {
      this.bottomY += 3;
    }
    this.setPos();
  }

  setPos() {
    this.graphic.position.set(this.x, this.bottomY);
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

  render(stage) {
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    this.graphic.lineTo(0, -40);

    this.setPos();

    stage.addChild(this.graphic);
  }
}