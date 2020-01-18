window.onerror = (var1, var2, var3, var4, var5) => console.log(var5.stack);
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context);
// CanvasRenderingContext2D.prototype.fillText = text => {
//   console.log(text);
// }
context.font = "30px Comic Sans MS";
context.fillStyle = "red";
context.textAlign = "center";
context.fillText("Hello World", canvas.width/2, canvas.height/2);