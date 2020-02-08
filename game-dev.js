class Game {
  // create global variables
  static WIDTH = 1200;
  static HEIGHT = 600;
  
  constructor() {
    // create PIXI app
    this.app = new PIXI.Application({
      width: Game.WIDTH,
      height: Game.HEIGHT,
      transparent: true,
      antialias: true
    });
    
    // create game objects
    this.paddle = new Paddle(3, Game.HEIGHT / 2);
    this.paddle2 = new Paddle(Game.WIDTH - 3, Game.HEIGHT / 2);
    this.ball = new Ball(Game.WIDTH / 2, Game.HEIGHT / 2);
    this.projectionBall = new Ball(Game.WIDTH / 2, Game.HEIGHT / 2);
    
    // create score
    this.score = 0;
    this.scoreGraphic = new PIXI.Text(this.score, {
      fontFamily: 'Arial',
      fontSize: 24
    });
    this.init();
    
    this.step();
  }
  
  init() {
    // rendering
    this.app.stage.addChild(this.paddle.graphic);
    this.app.stage.addChild(this.paddle2.graphic);
    this.app.stage.addChild(this.ball.graphic);
    
    // score rendering
    this.scoreGraphic.anchor.set(0.5, 0.5);
    this.scoreGraphic.position.set(Game.WIDTH / 2, 20);
    this.app.stage.addChild(this.scoreGraphic);
    
    // insert canvas
    document.querySelector('#game').insertBefore(this.app.view, document.querySelector('#controls'));
    
    // event listener registering
    window.onkeydown = e => {
      // player 1
      switch (e.key) {
        // positive is down
        case 'w':
          this.paddle.direction = -1;
          break;
        case 's':
          this.paddle.direction = 1;
          break;
        case 'd':
        case 'a':
          this.paddle.activatePower();
          break;
      }
      
      // player 2
      if (!this.ai) {
        switch (e.key) {
          // positive is down
          case 'ArrowUp':
            this.paddle2.direction = -1;
            break;
          case 'ArrowDown':
            this.paddle2.direction = 1;
            break;
          case 'ArrowLeft':
          case 'ArrowRight':
            this.paddle2.activatePower();
            break;
        }
      }
    };
    window.onkeyup = e => {
      // player 1
      switch (e.key) {
        case 'w':
          this.paddle.direction = 0;
          break;
        case 's':
          this.paddle.direction = 0;
          break;
      }
      
      // player 2
      if (!this.ai) {
        switch (e.key) {
          case 'ArrowUp':
            this.paddle2.direction = 0;
            break;
          case 'ArrowDown':
            this.paddle2.direction = 0;
            break;
        }
      }
    };
  }
  
  step() {
    // move the paddles
    this.paddle.move();
    
    /*this.ball.tick();
    if (this.powered) {
      this.ball.tick();
    }
    this.paddle.tick();
    this.paddle2.tick();*/
    
    /*if (this.score % 3 === 0 && this.score !== 0) {
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
    */
    requestAnimationFrame(() => this.step());
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