let hearts = [], score = 0, gamePaused = false, basketX = 180; // basket middle of 360px box
const maxScore = 20;

const container = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const gameOver = document.getElementById('game-over');

function createHeart(){
  if(score >= maxScore) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  const isGolden = Math.random() < 0.15;
  heart.innerText = isGolden ? '💛' : '💗';
  heart.dataset.value = isGolden ? 3 : 1;

  heart.style.left = Math.random()*(container.clientWidth-30)+'px';
  heart.style.top = '-30px';
  container.appendChild(heart);
  hearts.push(heart);
}

function moveBasket(e){
  if(gamePaused) return;
  const rect = container.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
  basketX = x - 30; // adjust for basket width
  if(basketX < 0) basketX = 0;
  if(basketX > container.clientWidth-60) basketX = container.clientWidth-60;
  basket.style.left = basketX + 'px';
}

function updateHearts(){
  if(gamePaused) return;
  hearts.forEach((heart,i)=>{
    let top = parseFloat(heart.style.top);
    top += 1.2; // slow fall
    heart.style.top = top+'px';

    const heartX = parseFloat(heart.style.left);
    const heartY = top;

    if(heartY+30 >= container.clientHeight-60 && heartX+30>basketX && heartX<basketX+60){
      score += parseInt(heart.dataset.value);
      if(score > maxScore) score = maxScore;
      scoreEl.innerText = 'Score: '+score;
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
