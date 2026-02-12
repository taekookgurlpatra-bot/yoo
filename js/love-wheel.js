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
  if(window.wheelSpinning) return;
  window.wheelSpinning = true;

  const totalRotation = Math.floor(Math.random() * 360) + 720; // 2+ spins
  const startRotation = rotation;
  const duration = 4000; // 4 seconds spin
  const startTime = performance.now();

  function animate(time){
    let elapsed = time - startTime;
    if(elapsed > duration) elapsed = duration;

    // Ease out cubic
    const progress = 1 - Math.pow(1 - elapsed/duration, 3);
    rotation = startRotation + totalRotation * progress;

    wheelCanvas.style.transform = `rotate(${rotation}deg)`;

    // Tick-tick effect: play a small "tick" when crossing segment borders
    const segAngle = 360 / segments.length;
    const prevTickIndex = Math.floor(startRotation/segAngle);
    const currentTickIndex = Math.floor(rotation/segAngle);
    if(currentTickIndex != prevTickIndex){
      // Play a small tick sound or just log for now
      // Example: console.log("tick");
      startRotation = rotation; // update for next tick
    }

    if(elapsed < duration){
      requestAnimationFrame(animate);
    } else {
      window.wheelSpinning=false;
      // Determine final segment
      const index = segments.length - 1 - Math.floor((rotation%360)/(360/segments.length));
      const dare = window.dares[index>=segments.length?0:index];
      document.getElementById('dare-title').innerText=dare.title;
      document.getElementById('dare-desc').innerText=dare.desc;
      document.getElementById('dare-overlay').style.display="block";
      document.getElementById('dare-input').style.display=dare.type==="text"?"block":"none";
      const canvas = document.getElementById('dare-canvas');
      canvas.style.display=dare.type==="draw"?"block":"none";
      if(dare.type==="draw") {
        const c = canvas.getContext('2d');
        c.clearRect(0,0,canvas.width,canvas.height);
        window.setupDrawing(canvas,c);
      }
    }
  }

  requestAnimationFrame(animate);
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
