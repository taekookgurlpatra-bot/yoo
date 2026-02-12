// Shared game initialization (per game)
function initGame(backgroundId) {
  const gameBackground = document.getElementById(backgroundId);
  const instructions = document.getElementById('instructions');
  const startBtn = document.getElementById('startGame');
  const pauseBtn = document.getElementById('pauseBtn');
  const instructionsBtn = document.getElementById('instructionsBtn');

  let gamePaused = false;

  // Show instructions initially
  gameBackground.classList.add('blurred');
  instructions.style.display = 'block';

  startBtn.addEventListener('click', () => {
    instructions.style.display = 'none';
    gameBackground.classList.remove('blurred');
    startGame();
  });

  pauseBtn.addEventListener('click', () => {
    gamePaused = !gamePaused;
    pauseBtn.textContent = gamePaused ? 'Play' : 'Pause';
  });

  instructionsBtn.addEventListener('click', () => {
    instructions.style.display = 'block';
    gameBackground.classList.add('blurred');
  });
}
