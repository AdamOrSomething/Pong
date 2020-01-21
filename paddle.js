class Paddle {
  constructor(height, x) {
    this.height = height;
    this.x = x;
    this.bottomY = this.height / 2 - 10;
    this.graphic = new PIXI.Graphics();
  }
  
  up() {
    if (this.bottomY - 30 > 0) {
      this.bottomY -= 2;
    }
    this.setPos();
  }
  
  down() {
    if (this.bottomY < this.height) {
      this.bottomY += 2;
    }
    this.setPos();
  }
  
  setPos() {
    this.graphic.position.set(this.x, this.bottomY);
  }
  
  render(stage) {
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    this.graphic.lineTo(0, -30);
    
    this.setPos();
    
    stage.addChild(this.graphic);
  }
}