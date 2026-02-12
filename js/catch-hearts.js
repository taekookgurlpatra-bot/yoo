let hearts = [], score = 0, gamePaused = false, basketX = 180;
const maxScore = 20;

const container = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const gameOver = document.getElementById('game-over');

// Create hearts
function createHeart(){
  if(score >= maxScore) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  const isGolden = Math.random() < 0.15;
  heart.innerText = isGolden ? '💛' : '💗';
  heart.dataset.value = isGolden ? 3 : 1;
  heart.dataset.golden = isGolden ? 'true' : 'false';

  heart.style.left = Math.random()*(container.clientWidth-30)+'px';
  heart.style.top = '-30px';
  container.appendChild(heart);
  hearts.push(heart);
}

// Move basket
function moveBasket(e){
  if(gamePaused) return;
  const rect = container.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  basketX = x - 30;
  if(basketX < 0) basketX = 0;
  if(basketX > container.clientWidth-60) basketX = container.clientWidth-60;
  basket.style.left = basketX + 'px';
}

// Create sparkle effect
function createSparkle(x, y){
  const sparkle = document.createElement('div');
  sparkle.innerText = '✨';
  sparkle.style.position = 'absolute';
  sparkle.style.left = x + Math.random()*20 - 10 + 'px';
  sparkle.style.top = y + Math.random()*20 - 10 + 'px';
  sparkle.style.fontSize = 14 + Math.random()*10 + 'px';
  sparkle.style.opacity = 1;
  sparkle.style.transition = 'all 0.8s ease-out';
  container.appendChild(sparkle);

  // Animate fade and float
  setTimeout(()=>{
    sparkle.style.transform = `translateY(-20px)`;
    sparkle.style.opacity = 0;
  },10);

  // Remove after animation
  setTimeout(()=>{ container.removeChild(sparkle); },900);
}

// Update hearts
function updateHearts(){
  if(gamePaused) return;
  hearts.forEach((heart,i)=>{
    let top = parseFloat(heart.style.top);
    top += 1.2; // slow fall
    heart.style.top = top+'px';

    const heartX = parseFloat(heart.style.left);
    const heartY = top;

    if(heartY+30 >= container.clientHeight-60 && heartX+30>basketX && heartX<basketX+60){
      const points = parseInt(heart.dataset.value);
      score += points;
      if(score > maxScore) score = maxScore;
      scoreEl.innerText = 'Score: '+score;

      // Sparkles for golden hearts
      if(heart.dataset.golden === 'true'){
        createSparkle(basketX + 30, container.clientHeight-60);
        createSparkle(basketX + 20, container.clientHeight-50);
        createSparkle(basketX + 40, container.clientHeight-55);
      }

      container.removeChild(heart);
      hearts.splice(i,1);
    } else if(top > container.clientHeight){
      container.removeChild(heart);
      hearts.splice(i,1);
    }
  });

  if(score >= maxScore){
    gameOver.style.display = 'block';
    return;
  }

  requestAnimationFrame(updateHearts);
}

// Start game
function startHeartsGame(){
  document.getElementById('instructions').style.display='none';
  container.classList.remove('blurred');
  setInterval(createHeart, 1200);
  requestAnimationFrame(updateHearts);
}

// Controls
document.getElementById('startGame').addEventListener('click', startHeartsGame);
document.getElementById('pauseBtn').addEventListener('click',()=>{
  gamePaused=!gamePaused;
  document.getElementById('pauseBtn').innerText = gamePaused?'Play':'Pause';
});
document.getElementById('instructionsBtn').addEventListener('click',()=>{
  document.getElementById('instructions').style.display='block';
  container.classList.add('blurred');
});

container.addEventListener('mousemove', moveBasket);
container.addEventListener('touchmove', moveBasket);

initGame('game-container', startHeartsGame);
