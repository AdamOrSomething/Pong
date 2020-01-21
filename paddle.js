class Paddle {
  constructor(height) {
    this.height = height;
    this.bottomY = this.height / 2 - 10;
    this.graphic = new PIXI.Graphics();
  }
  
  up() {
    if (this.bottomY - 20 > 0) {
      this.bottomY--;
    }
    this.setPos();
  }
  
  down() {
    if (this.bottomY < this.height) {
      this.bottomY++;
    }
    this.setPos();
  }
  
  setPos() {
    this.graphic.position.set(3, this.bottomY);
  }
  
  render(stage) {
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    this.graphic.lineTo(0, -20);
    
    this.setPos();
    
    stage.addChild(this.graphic);
  }
}