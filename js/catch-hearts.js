let hearts = [], score = 0, gamePaused = false, basketX = window.innerWidth/2 - 40;
const maxScore = 20;

const background = document.getElementById('hearts-background');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const gameOver = document.getElementById('game-over');

// Create hearts: red normally, gold sometimes
function createHeart(){
  if(score >= maxScore) return;

  const heart = document.createElement('div');
  heart.classList.add('heart');

  const isGolden = Math.random() < 0.15; // 15% chance golden
  heart.innerText = isGolden ? '💛' : '❤️';
  heart.dataset.value = isGolden ? 3 : 1; // points

  heart.style.left = Math.random()*(window.innerWidth-30)+'px';
  heart.style.top = '-30px';
  background.appendChild(heart);
  hearts.push(heart);
}

function moveBasket(e){
  if(gamePaused) return;
  basketX = e.touches ? e.touches[0].clientX - 40 : e.clientX - 40;
  if(basketX < 0) basketX = 0;
  if(basketX > window.innerWidth-80) basketX = window.innerWidth-80;
  basket.style.left = basketX + 'px';
}

function updateHearts(){
  if(gamePaused) return;
  hearts.forEach((heart,i)=>{
    let top = parseFloat(heart.style.top);
    top += 1.2; // slow falling
    heart.style.top = top+'px';

    const heartX = parseFloat(heart.style.left);
    const heartY = top;

    if(heartY+30 >= window.innerHeight-60 && heartX+30>basketX && heartX<basketX+80){
      score += parseInt(heart.dataset.value);
      if(score > maxScore) score = maxScore;
      scoreEl.innerText = 'Score: '+score;
      background.removeChild(heart);
      hearts.splice(i,1);
    } else if(top > window.innerHeight){
      background.removeChild(heart);
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
  background.classList.remove('blurred');
  setInterval(createHeart, 1200); // slower heart rain
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
  background.classList.add('blurred');
});

background.addEventListener('mousemove', moveBasket);
background.addEventListener('touchmove', moveBasket);

initGame('hearts-background', startHeartsGame);
