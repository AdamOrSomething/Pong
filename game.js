class Game {
  constructor(selector) {
    this.fabric = new fabric.StaticCanvas(selector);
    this.paddle = new Paddle();
    this.ball = new Ball(this.fabric.getWidth(), this.fabric.getHeight());
    this.ball.render(this.fabric);
  }
}