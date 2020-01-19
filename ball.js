class Ball {
  constructor(width, height) {
    this.movingLeft = Math.random() >= 0.5;
    this.movingUp = Math.random() >= 0.5;
    this.x = width/2;
    this.y = height/2;
    this.width = width;
    this.height = height;
    this.fabricObject = new fabric.Circle({
      fill: 'black',
      radius: 20,
      left: this.x,
      top: this.y
    });
  }

  tick() {
    if(this.movingLeft) {
      if(--this.x === 0) {
        this.movingLeft = false;
      }
    } else {
      if(++this.x === this.width) {
        this.movingLeft = true;
      }
    }
    if(this.movingUp) {
      if(++this.y === this.height) {
        this.movingUp = false;
      }
    } else {
      if(--this.y === 0) {
        this.movingUp = true;
      }
    }
    this.fabricObject.set({
      left: this.x,
      top: this.y
    });
  }

  render(fabricCanvas) {
    fabricCanvas.add(this.fabricObject);
  }
}