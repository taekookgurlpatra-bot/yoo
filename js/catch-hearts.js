let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let hearts = [];
let basket = { x: 250, y: 350, width: 100, height: 20 };
let score = 0;

function startCatchHeartsGame() {
  document.addEventListener('mousemove', e => {
    basket.x = e.offsetX - basket.width/2;
  });

  function spawnHeart() {
    hearts.push({ x: Math.random()*550, y: -20, size: 20 });
  }

  setInterval(spawnHeart, 1000);

  function gameLoop() {
    if (!gameRunning) return;
    if (!gamePaused) {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = 'pink';
      hearts.forEach((h, i) => {
        h.y += 2;
        ctx.beginPath();
        ctx.arc(h.x, h.y, h.size, 0, Math.PI*2);
        ctx.fill();
        // Catch hearts
        if(h.y + h.size > basket.y &&
           h.x > basket.x && h.x < basket.x + basket.width) {
          hearts.splice(i,1);
          score++;
        }
      });
      // Draw basket
      ctx.fillStyle = 'red';
      ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
      // Draw score
      ctx.fillStyle = 'black';
      ctx.font = '20px Arial';
      ctx.fillText('Score: ' + score, 10, 30);
    }
    requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

