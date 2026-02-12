// 10 playful LDR Valentine questions
const questions = [
  { q: "Favorite way to spend time together online?", a:["Voice call 🎤","Play games 🎮","Watch movie 🎬","Chat randomly 💌"] },
  { q: "Preferred weather for a date?", a:["Sunny 🌞","Rainy 🌧️","Snowy ❄️","Starry 🌌"] },
  { q: "Pick a color theme for our date.", a:["Red ❤️","Pink 💗","Lavender 💜","Gold ✨"] },
  { q: "Food for our date?", a:["Chocolate 🍫","Pizza 🍕","Ice cream 🍦","Sushi 🍣"] },
  { q: "Fun activity?", a:["Beach walk 🏖️","Movie night 🎥","Picnic 🧺","Stargazing ✨"] },
  { q: "Music for the date?", a:["Romantic 🎵","Pop 🎶","Jazz 🎷","Silence 🌙"] },
  { q: "Pick a surprise gift.", a:["Flowers 🌹","Letter 💌","Teddy 🧸","Chocolates 🍫"] },
  { q: "Best time?", a:["Morning 🌞","Afternoon 🌼","Evening 🌇","Night 🌙"] },
  { q: "Cute element?", a:["Candles 🕯️","Fairy lights ✨","Balloon 🎈","Confetti 🎉"] },
  { q: "Sweet memory to relive?", a:["First video call 📱","First text 💌","First gift 🎁","First joke 😂"] }
];

const datePlans = [
  { name: "Beach Date 🏖️", desc: "Grab snacks and a blanket, enjoy waves & sunset together." },
  { name: "Movie Night 🎥", desc: "Snuggle up with your favorite film and popcorn." },
  { name: "Picnic 🧺", desc: "Spread a blanket, enjoy treats and talk under the sky." },
  { name: "Stargazing ✨", desc: "Lay back, gaze at stars, share secrets and dreams." }
];

let answers = [];
let currentQ = 0;

function startDatePlanner() {
  document.getElementById('question-container').style.display = 'block';
  showQuestion();
}

function showQuestion() {
  if(currentQ >= questions.length) return showResult();
  if(gamePaused) return setTimeout(showQuestion, 100);

  let q = questions[currentQ];
  document.getElementById('question').innerText = q.q;
  for(let i=0;i<4;i++){
    const btn = document.getElementById('opt'+i);
    btn.innerText = q.a[i];
    btn.onclick = () => {
      answers.push(i);
      currentQ++;
      showQuestion();
    };
  }
}

function showResult() {
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';

  let sum = answers.reduce((a,b)=>a+b,0);
  let planIndex = sum % datePlans.length;
  let plan = datePlans[planIndex];

  document.getElementById('result-title').innerText = plan.name;
  document.getElementById('result-desc').innerText = plan.desc;
}
