// 10 playful LDR Valentine questions
const questions = [
  { q: "What’s your favorite way to spend time together online?", a:["Video call ❤️","Play games 🎮","Watch movie 🎬","Chat randomly 💌"] },
  { q: "What kind of weather do you like for a date?", a:["Sunny 🌞","Rainy 🌧️","Snowy ❄️","Starry 🌌"] },
  { q: "Pick a color theme for our date.", a:["Red ❤️","Pink 💗","Lavender 💜","Gold ✨"] },
  { q: "What kind of food should be there?", a:["Chocolate 🍫","Pizza 🍕","Ice cream 🍦","Sushi 🍣"] },
  { q: "Pick a fun activity.", a:["Beach walk 🏖️","Movie night 🎥","Picnic 🧺","Stargazing ✨"] },
  { q: "What kind of music?", a:["Romantic 🎵","Pop 🎶","Jazz 🎷","Silence 🌙"] },
  { q: "Pick a surprise gift.", a:["Flowers 🌹","Handwritten letter 💌","Teddy 🧸","Chocolates 🍫"] },
  { q: "Best time for the date?", a:["Morning 🌞","Afternoon 🌼","Evening 🌇","Night 🌙"] },
  { q: "Pick a cute element.", a:["Candles 🕯️","Fairy lights ✨","Balloon 🎈","Confetti 🎉"] },
  { q: "Pick a sweet memory to relive.", a:["First video call 📱","First text 💌","First gift 🎁","First joke 😂"] }
];

// Possible date plans
const datePlans = [
  { name: "Beach Date 🏖️", desc: "Pack some snacks, grab a blanket, and enjoy the waves and sunset together. Perfect for relaxing and laughing." },
  { name: "Movie Night 🎥", desc: "Snuggle up online or in person with your favorite films, popcorn, and lots of cozy vibes." },
  { name: "Picnic 🧺", desc: "Spread a blanket, enjoy some treats, and talk for hours under the sky. Sweet, simple, and romantic." },
  { name: "Stargazing ✨", desc: "Lay back and gaze at the stars together, share secrets and dreams — a magical LDR moment." }
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

  // Simple logic: sum answers to pick date plan
  let sum = answers.reduce((a,b)=>a+b,0);
  let planIndex = sum % datePlans.length;
  let plan = datePlans[planIndex];

  document.getElementById('result-title').innerText = plan.name;
  document.getElementById('result-desc').innerText = plan.desc;
}
