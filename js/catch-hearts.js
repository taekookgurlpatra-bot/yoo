let hearts = [], score = 0, gamePaused = false, basketX = 150;
const maxScore = 20;
const fallSpeed = 2.2; // increased for moderate speed

const container = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const gameOver = document.getElementById('game-over');
const okGameOverBtn = document.getElementById('okGameOver');
const instructionsOverlay = document.getElementById('instructions-overlay');

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

// Basket movement
function moveBasket(e){
  if(gamePaused) return;
  e.preventDefault(); // prevent page scroll on mobile
  const rect = container.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  basketX = x - 30;
  if(basketX < 0) basketX = 0;
  if(basketX > container.clientWidth-60) basketX = container.clientWidth-60;
  basket.style.left = basketX + 'px';
}

// Sparkles
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

  setTimeout(()=>{
    sparkle.style.transform = `translateY(-20px)`;
    sparkle.style.opacity = 0;
  },10);

  setTimeout(()=>{ container.removeChild(sparkle); },900);
}

// Update hearts
function updateHearts(){
  if(gamePaused) return;
  hearts.forEach((heart,i)=>{
    let top = parseFloat(heart.style.top);
    top += fallSpeed; // faster speed
    heart.style.top = top+'px';

    const heartX = parseFloat(heart.style.left);
    const heartY = top;

    if(heartY+30 >= container.clientHeight-60 && heartX+30>basketX && heartX<basketX+60){
      const points = parseInt(heart.dataset.value);
      score += points;
      if(score > maxScore) score = maxScore;
      scoreEl.innerText = 'Score: '+score;

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
  instructionsOverlay.style.display = 'none';
  container.classList.remove('blurred');
  setInterval(createHeart, 1000); // slightly faster heart generation
  requestAnimationFrame(updateHearts);
}

// Controls
document.getElementById('startGame').addEventListener('click', startHeartsGame);

document.getElementById('pauseBtn').addEventListener('click',()=>{
  gamePaused=!gamePaused;
  document.getElementById('pauseBtn').innerText = gamePaused?'Play':'Pause';
});

document.getElementById('instructionsBtn').addEventListener('click', ()=>{
  instructionsOverlay.style.display = 'flex';
});

// Basket movement with mouse/touch
container.addEventListener('mousemove', moveBasket);
container.addEventListener('touchmove', moveBasket, {passive:false});

// Game over OK button
okGameOverBtn.addEventListener('click', ()=>{
  gameOver.style.display='none';
  hearts.forEach(h=>container.removeChild(h));
  hearts=[];
  score=0;
  scoreEl.innerText='Score: 0';
  instructionsOverlay.style.display='flex';
});
