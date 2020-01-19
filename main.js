window.onerror = (var1, var2, var3, var4, var5) => console.log(var5.stack);
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context);