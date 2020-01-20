class Paddle {
  constructor(height) {
    this.bottomY = height / 2 - 10;
    this.graphic = new PIXI.Graphics();
  }
  
  up() {
    this.bottomY--;
    this.setPos();
  }
  
  down() {
    this.bottomY++;
    this.setPos();
  }
  
  setPos() {
    this.graphic.position.set(3, this.bottomY);
  }
  
  render(stage) {
    this.graphic.lineStyle(2, 0x000000, 1);
    this.graphic.moveTo(0, 0);
    this.graphic.lineTo(0, 20);
    
    this.setPos();
    
    stage.addChild(this.graphic);
  }
}