class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 720,
      height: 480,
      transparent: true,
      antialias: true
    });
    this.paddle = new Paddle(480);
    this.ball = new Ball(720, 480);
    this.initialRender();
    this.start();
  }
  
  initialRender() {
    this.ball.render(this.app.stage);
    this.paddle.render(this.app.stage);
    document.body.appendChild(this.app.view);
  }
  
  start() {
    this.ball.tick();
    requestAnimationFrame(() => {this.start()});
  }
}