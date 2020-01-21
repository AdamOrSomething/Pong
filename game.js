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
    this.up = false;
    this.down = false;
    this.initialRender();
    this.registerEventListeners();
    this.start();
  }
  
  initialRender() {
    this.ball.render(this.app.stage);
    this.paddle.render(this.app.stage);
    document.body.appendChild(this.app.view);
  }
  
  registerEventListeners() {
    window.onkeydown = e => {
      if (e.key === "ArrowUp") {
        this.up = true;
      }
      if (e.key === "ArrowDown") {
        this.down = true;
      }
    };
    window.onkeyup = e => {
      if (e.key === "ArrowUp") {
        this.up = false;
      }
      if (e.key === "ArrowDown") {
        this.down = false;
      }
    }
  }
  
  start() {
    this.ball.tick();
    if (this.up) {
      this.paddle.up();
    }
    if (this.down) {
      this.paddle.down();
    }
    
    if (this.ball.x - 5 <= 4) {
      const paddleBottom = this.paddle.bottomY;
      const paddleTop = this.paddle.bottomY - 20;
      const ballTop = this.ball.y - 5;
      const ballBottom = this.ball.y + 5;
      if(ballTop < paddleBottom && ballBottom > paddleTop) {
        this.ball.movingLeft = false;
      }
    }
    requestAnimationFrame(() => {
      this.start();
    });
  }
}