class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 720,
      height: 480,
      transparent: true,
      antialias: true
    });
    this.paddle = new Paddle(480, 3);
    this.paddle2 = new Paddle(480, 717);
    this.ball = new Ball(720, 480);
    this.score = 0;
    this.scoreGraphic = new PIXI.Text(this.score, {
      fontFamily: 'Arial',
      fontSize: 18
    });
    this.initialRender();
    this.registerEventListeners();
    this.start();
  }
  
  initialRender() {
    this.ball.render(this.app.stage);
    this.paddle.render(this.app.stage);
    this.paddle2.render(this.app.stage);
    
    this.scoreGraphic.position.set(700, 10);
    this.app.stage.addChild(this.scoreGraphic);
    
    document.body.appendChild(this.app.view);
  }
  
  registerEventListeners() {
    window.onkeydown = e => {
      if (e.key === "ArrowUp") {
        this.up2 = true;
      }
      if (e.key === "ArrowDown") {
        this.down2 = true;
      }
      if (e.key === "w") {
        this.up = true;
      }
      if (e.key === "s") {
        this.down = true;
      }
    };
    window.onkeyup = e => {
      if (e.key === "ArrowUp") {
        this.up2 = false;
      }
      if (e.key === "ArrowDown") {
        this.down2 = false;
      }
      if (e.key === "w") {
        this.up = false;
      }
      if (e.key === "s") {
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
    if (this.up2) {
      this.paddle2.up();
    }
    if (this.down2) {
      this.paddle2.down();
    }
    
    /*const paddleCenter = this.paddle2.bottomY - 15;
    
    if (this.ball.y !== paddleCenter) {
      if (paddleCenter > this.ball.y) {
        this.paddle2.up();
      } else {
        this.paddle2.down();
      }
    }*/
    
    if (this.ball.x - 5 <= 4) {
      const paddleBottom = this.paddle.bottomY;
      const paddleTop = this.paddle.bottomY - 30;
      const ballTop = this.ball.y - 5;
      const ballBottom = this.ball.y + 5;
      if (ballTop < paddleBottom && ballBottom > paddleTop) {
        this.ball.movingLeft = false;
        this.score++;
        this.scoreGraphic.text = this.score;
      } else {
        if (this.ball.endGame) {
          this.gameOver();
          return;
        }
      }
    } else if (this.ball.x + 5 >= 716) {
      const paddleBottom = this.paddle2.bottomY;
      const paddleTop = this.paddle2.bottomY - 30;
      const ballTop = this.ball.y - 5;
      const ballBottom = this.ball.y + 5;
      if (ballTop < paddleBottom && ballBottom > paddleTop) {
        this.ball.movingLeft = true;
      } else {
        if (this.ball.endGame) {
          this.gameOver();
          return;
        }
      }
    }
    requestAnimationFrame(() => {
      this.start();
    });
  }
  
  gameOver() {
  
  }
}