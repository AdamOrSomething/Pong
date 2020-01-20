class Paddle {
  constructor(height) {
    this.bottomY = height / 2 - 10;
    this.graphic = new PIXI.Graphics();
  }
  
  render(stage) {
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(3, this.bottomY);
    this.graphic.lineTo(3, this.bottomY + 20);
    
    stage.addChild(this.graphic);
  }
}