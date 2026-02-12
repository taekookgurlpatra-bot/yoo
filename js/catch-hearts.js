// Get DOM elements
const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const instructionsOverlay = document.getElementById('instructions-overlay');
const startGameBtn = document.getElementById('startGame');
const gameOverOverlay = document.getElementById('game-over');
const okGameOverBtn = document.getElementById('okGameOver');

let score = 0;
const maxScore = 20;
let hearts = [];
let gameInterval;
let isPaused = false;

// Basket movement
let basketPos = gameContainer.offsetWidth / 2 - 30; // initial center
const basketSpeed = 15;

// Mouse/touch inside the game box
gameContainer.addEventListener('mousemove', function(e){
    basketPos = e.offsetX - basket.offsetWidth/2;
    if(basketPos < 0) basketPos = 0;
    if(basketPos > gameContainer.offsetWidth - basket.offsetWidth) basketPos = gameContainer.offsetWidth - basket.offsetWidth;
    basket.style.left = basketPos + 'px';
});
gameContainer.addEventListener('touchmove', function(e){
    e.preventDefault();
    const touchX = e.touches[0].clientX - gameContainer.getBoundingClientRect().left;
    basketPos = touchX - basket.offsetWidth/2;
    if(basketPos < 0) basketPos = 0;
    if(basketPos > gameContainer.offsetWidth - basket.offsetWidth) basketPos = gameContainer.offsetWidth - basket.offsetWidth;
    basket.style.left = basketPos + 'px';
}, {passive:false});

// Create hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💗';
    heart.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
    heart.style.top = '-30px';
    gameContainer.appendChild(heart);
    hearts.push(heart);
}

// Move hearts
function moveHearts() {
    hearts.forEach((heart, index) => {
        let top = parseInt(heart.style.top);
        top += 3; // moderate speed
        heart.style.top = top + 'px';

        // Check collision with basket
        const basketRect = basket.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if (!(heartRect.right < basketRect.left || 
              heartRect.left > basketRect.right || 
              heartRect.bottom < basketRect.top || 
              heartRect.top > basketRect.bottom)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            heart.remove();
            hearts.splice(index,1);
        }

        // Remove heart if falls out
        if(top > gameContainer.offsetHeight) {
            heart.remove();
            hearts.splice(index,1);
        }
    });

    // Check game over
    if(score >= maxScore) endGame();
}

// Game loop
function gameLoop() {
    if(!isPaused) moveHearts();
}

// Start game
function startGame() {
    instructionsOverlay.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    hearts.forEach(h => h.remove());
    hearts = [];
    isPaused = false;
    gameInterval = setInterval(gameLoop, 20);

    // Generate hearts
    setInterval(() => {
        if(!isPaused && score < maxScore) createHeart();
    }, 800);
}

// Pause / Resume
const pauseBtn = document.getElementById('pauseBtn');
pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Play' : 'Pause';
});

// Instructions button
const instructionsBtn = document.getElementById('instructionsBtn');
instructionsBtn.addEventListener('click', () => {
    instructionsOverlay.style.display = 'flex';
    isPaused = true;
});

// Event listeners
startGameBtn.addEventListener('click', startGame);
okGameOverBtn.addEventListener('click', () => {
    gameOverOverlay.style.display = 'none';
});

// End game
function endGame() {
    isPaused = true;
    gameOverOverlay.style.display = 'block';
}
