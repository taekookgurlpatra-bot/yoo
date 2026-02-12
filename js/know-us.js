let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

const questions = [
  { q: "Favorite color?", a: ["Red","Blue","Green","Pink"], correct: 0 },
  { q: "Best day together?", a: ["Monday","Friday","Sunday","Wednesday"], correct: 2 },
];
let currentQ = 0;
let score = 0;

function startKnowUsGame() {
  canvas.addEventListener('click', checkAnswer);
  showQuestion();
}

function showQuestion() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let q = questions[currentQ];
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(q.q, 20, 50);
  q.a.forEach((opt,i) => {
    ctx.fillStyle = "blue";
    ctx.fillText((i+1)+". "+opt, 40, 100 + i*40);
  });
}

function checkAnswer(e) {
  let x = e.offsetX, y = e.offsetY;
  let opt = Math.floor((y-80)/40);
  if(opt === questions[currentQ].correct) score++;
  currentQ++;
  if(currentQ < questions.length) showQuestion();
  else {
    canvas.removeEventListener('click', checkAnswer);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillText('Quiz Over! Score: '+score, 200, 200);
  }
}
