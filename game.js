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
    this.projectionBall = new Ball(720, 480);
    this.score = 0;
    this.scoreGraphic = new PIXI.Text(this.score, {
      fontFamily: 'Arial',
      fontSize: 24
    });
    this.initialRender();
    this.registerEventListeners();
    if (!this.ball.movingLeft) this.recalculateBallPath();
    this.start();
  }

  initialRender() {
    this.ball.render(this.app.stage);
    //this.projectionBall.render(this.app.stage);
    this.paddle.render(this.app.stage);
    this.paddle2.render(this.app.stage);

    this.scoreGraphic.anchor.set(0.5, 0.5);
    this.scoreGraphic.position.set(720 / 2, 20);
    this.app.stage.addChild(this.scoreGraphic);

    document.querySelector('#game').insertBefore(this.app.view, document.querySelector('#controls'));
  }

  registerEventListeners() {
    window.onkeydown = e => {
      if (!this.ai) {
        if (e.key === "ArrowUp") {
          this.paddle2.movingUp = true;
        }
        if (e.key === "ArrowDown") {
          this.paddle2.movingDown = true;
        }
        if (e.key === "/") {
          this.paddle2.activatePower();
        }
      }
      if (e.key === "w") {
        this.paddle.movingUp = true;
      }
      if (e.key === "s") {
        this.paddle.movingDown = true;
      }
      if (e.key === "d") {
        this.paddle.activatePower();
      }
      if (e.key === "k") {
        this.ai = !this.ai;
      }
    };
    window.onkeyup = e => {
      if (!this.ai) {
        if (e.key === "ArrowUp") {
          this.paddle2.movingUp = false;
        }
        if (e.key === "ArrowDown") {
          this.paddle2.movingDown = false;
        }
      }
      if (e.key === "w") {
        this.paddle.movingUp = false;
      }
      if (e.key === "s") {
        this.paddle.movingDown = false;
      }
    }
  }

  start() {
    this.ball.tick();
    if (this.powered) {
      this.ball.tick();
    }
    this.paddle.tick();
    this.paddle2.tick();

    if (this.score % 3 === 0 && this.score !== 0) {
      this.paddle.power();
      if (!this.ai) this.paddle2.power();
    }

    if (this.ai) {
      const paddleCenter = this.paddle2.bottomY - 20;

      if (this.projectionBall.y !== paddleCenter) {
        if (paddleCenter > this.projectionBall.y) {
          this.paddle2.up();
        } else {
          this.paddle2.down();
        }
      }
    }
    if (this.dev) {
      const paddleCenter = this.paddle.bottomY - 20;

      if (this.ball.y !== paddleCenter) {
        if (paddleCenter > this.ball.y) {
          this.paddle.up();
          this.paddle.up();
        } else {
          this.paddle.down();
          this.paddle.down();
        }
      }
    }

    if (this.ball.x - 5 <= 4) {
      const paddleBottom = this.paddle.bottomY;
      const paddleTop = this.paddle.bottomY - 40;
      const ballTop = this.ball.y - 5;
      const ballBottom = this.ball.y + 5;
      if (ballTop < paddleBottom && ballBottom > paddleTop) {
        this.powered = false;
        this.ball.movingLeft = false;
        this.score++;
        this.scoreGraphic.text = this.score;
        if (this.paddle.powerActivated) {
          this.powered = true;
          this.paddle.powerActivated = false;
          this.paddle.resetColor();
        }
        this.recalculateBallPath();
      } else {
        if (this.ball.endGame) {
          this.gameOver();
          return;
        }
      }
    } else if (this.ball.x + 5 >= 716) {
      const paddleBottom = this.paddle2.bottomY;
      const paddleTop = this.paddle2.bottomY - 40;
      const ballTop = this.ball.y - 5;
      const ballBottom = this.ball.y + 5;
      if (ballTop < paddleBottom && ballBottom > paddleTop) {
        this.powered = false;
        this.ball.movingLeft = true;
        if (!this.ai) {
          this.score++;
          this.scoreGraphic.text = this.score;
          if (this.paddle2.powerActivated) {
            this.powered = true;
            this.paddle2.powerActivated = false;
            this.paddle2.resetColor();
          }
        }
        this.projectionBall.y = 240;
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

  recalculateBallPath() {
    this.projectionBall.x = this.ball.x;
    this.projectionBall.y = this.ball.y;
    this.projectionBall.movingLeft = this.ball.movingLeft;
    this.projectionBall.movingUp = this.ball.movingUp;
    while (!(this.projectionBall.x + 5 >= 716)) {
      this.projectionBall.tick();
      if (this.powered) this.projectionBall.tick();
    }
  }

  gameOver() {
    this.paddle.resetColor();
    this.paddle2.resetColor();
    const gameOverText = new PIXI.Text('Game Over', {
      fontFamily: 'Arial',
      fontSize: 48,
      fill: 0xFF0000
    });
    gameOverText.anchor.set(0.5, 0.5);
    gameOverText.position.set(720 / 2, 480 / 2);
    this.app.stage.addChild(gameOverText);
  }
}