const gameContainer = document.getElementById('game-container');
const basket = document.getElementById('basket');
const scoreDisplay = document.getElementById('score');
const instructionsOverlay = document.getElementById('instructions-overlay');
const startGameBtn = document.getElementById('startGame');
const gameOverOverlay = document.getElementById('game-over');
const okGameOverBtn = document.getElementById('okGameOver');

const pauseBtn = document.getElementById('pauseBtn');
const instructionsBtn = document.getElementById('instructionsBtn');

let score = 0;
const maxScore = 20;
let hearts = [];
let isPaused = false;
let gameLoopInterval;
let heartGenInterval;

// Basket position
let basketPos = gameContainer.offsetWidth / 2 - 30;

// Basket movement
function moveBasket(e){
    let clientX;
    if(e.type === 'mousemove') clientX = e.offsetX;
    if(e.type === 'touchmove') clientX = e.touches[0].clientX - gameContainer.getBoundingClientRect().left;

    basketPos = clientX - basket.offsetWidth / 2;
    if(basketPos < 0) basketPos = 0;
    if(basketPos > gameContainer.offsetWidth - basket.offsetWidth) basketPos = gameContainer.offsetWidth - basket.offsetWidth;
    basket.style.left = basketPos + 'px';
}

gameContainer.addEventListener('mousemove', moveBasket);
gameContainer.addEventListener('touchmove', function(e){
    e.preventDefault();
    moveBasket(e);
}, {passive:false});

// Create heart
function createHeart(){
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💗';
    heart.style.left = Math.random() * (gameContainer.offsetWidth - 30) + 'px';
    heart.style.top = '-30px';
    gameContainer.appendChild(heart);
    hearts.push(heart);
}

// Move hearts
function moveHearts(){
    hearts.forEach((heart, idx) => {
        let top = parseInt(heart.style.top);
        top += 3; // moderate speed
        heart.style.top = top + 'px';

        const basketRect = basket.getBoundingClientRect();
        const heartRect = heart.getBoundingClientRect();

        if(!(heartRect.right < basketRect.left ||
             heartRect.left > basketRect.right ||
             heartRect.bottom < basketRect.top ||
             heartRect.top > basketRect.bottom)){
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            heart.remove();
            hearts.splice(idx,1);
        }

        if(top > gameContainer.offsetHeight){
            heart.remove();
            hearts.splice(idx,1);
        }
    });

    if(score >= maxScore) endGame();
}

// Game loop
function gameLoop(){
    if(!isPaused) moveHearts();
}

// Start game
function startGame(){
    instructionsOverlay.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    hearts.forEach(h => h.remove());
    hearts = [];
    isPaused = false;

    clearInterval(gameLoopInterval);
    clearInterval(heartGenInterval);

    gameLoopInterval = setInterval(gameLoop, 20);
    heartGenInterval = setInterval(() => {
        if(!isPaused && score < maxScore) createHeart();
    }, 800);
}

// End game
function endGame(){
    isPaused = true;
    gameOverOverlay.style.display = 'block';
}

// Event listeners
startGameBtn.addEventListener('click', startGame);
okGameOverBtn.addEventListener('click', ()=>{
    gameOverOverlay.style.display = 'none';
});
pauseBtn.addEventListener('click', ()=>{
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Play' : 'Pause';
});
instructionsBtn.addEventListener('click', ()=>{
    instructionsOverlay.style.display = 'flex';
    isPaused = true;
});
