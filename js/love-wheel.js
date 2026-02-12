// Love Wheel Game
const dares = [
  { title:"📸 Send a selfie!", desc:"Take a cute selfie 😘 and send it to your love!", type:"text" },
  { title:"💌 5 Compliments", desc:"Write 5 sweet compliments 💖 for your partner!", type:"text" },
  { title:"🎶 Share a song", desc:"Share a song 🎵 that reminds you of your love!", type:"text" },
  { title:"📝 Write a short poem", desc:"Write a tiny poem 📝 (3-4 lines) for your partner!", type:"text" },
  { title:"🎨 Draw a doodle", desc:"Draw a cute doodle 🎨 and send it!", type:"draw" }
];

const wheel = document.getElementById("wheel");
const dareOverlay = document.getElementById("dare-overlay");
const dareTitle = document.getElementById("dare-title");
const dareDesc = document.getElementById("dare-desc");
const dareInput = document.getElementById("dare-input");
const dareCanvas = document.getElementById("dare-canvas");
const submitDare = document.getElementById("submitDare");

let wheelSpinning = false;

function spinWheel() {
  if(wheelSpinning) return;
  wheelSpinning = true;
  const spinDeg = Math.floor(Math.random()*360) + 720; // 2+ spins
  wheel.style.transition = "transform 4s cubic-bezier(0.33,1,0.68,1)";
  wheel.style.transform = `rotate(${spinDeg}deg)`;

  setTimeout(()=> {
    wheelSpinning = false;
    showDare(spinDeg);
  },4000);
}

function showDare(deg){
  const segmentAngle = 360 / dares.length;
  let index = dares.length - 1 - Math.floor((deg%360)/segmentAngle);
  if(index>=dares.length) index = 0;
  const dare = dares[index];
  dareTitle.innerText = dare.title;
  dareDesc.innerText = dare.desc;
  dareOverlay.style.display = "block";

  dareInput.style.display = dare.type==="text"?"block":"none";
  dareCanvas.style.display = dare.type==="draw"?"block":"none";

  if(dare.type==="draw") {
    const c = dareCanvas.getContext('2d');
    c.clearRect(0,0,dareCanvas.width,dareCanvas.height);
    setupDrawing(dareCanvas,c);
  }
}

function setupDrawing(canvas, ctx){
  let drawing = false;
  function start(e){ drawing=true; draw(e); }
  function end(){ drawing=false; ctx.beginPath(); }
  function draw(e){
    if(!drawing) return;
    const rect = canvas.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX)-rect.left;
    let y = (e.touches ? e.touches[0].clientY : e.clientY)-rect.top;
    ctx.lineWidth=2; ctx.lineCap="round"; ctx.strokeStyle="#ff4d6d";
    ctx.lineTo(x,y); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x,y);
  }
  canvas.addEventListener('mousedown',start);
  canvas.addEventListener('mouseup',end);
  canvas.addEventListener('mousemove',draw);
  canvas.addEventListener('touchstart',start);
  canvas.addEventListener('touchend',end);
  canvas.addEventListener('touchmove',draw);
}

submitDare.addEventListener('click',()=>{
  window.open('https://www.instagram.com/yourusername/', '_blank');
});

wheel.addEventListener('click', spinWheel);

initGame('wheel-background', ()=>{});
