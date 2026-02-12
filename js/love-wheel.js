let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let spinning = false;
let angle = 0;
const sections = ["💘", "🧠", "🎡", "💌", "🍫", "🌹"];
const n = sections.length;

function startLoveWheelGame() {
  canvas.addEventListener('click', spinWheel);
  drawWheel();
}

function drawWheel() {
  let r = 150;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  let cx = canvas.width/2, cy = canvas.height/2;
  for(let i=0;i<n;i++){
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.fillStyle = i%2===0?'pink':'red';
    ctx.arc(cx,cy,r,angle + i*2*Math.PI/n, angle + (i+1)*2*Math.PI/n);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.font = "20px Arial";
    let mid = angle + (i+0.5)*2*Math.PI/n;
    ctx.fillText(sections[i], cx + Math.cos(mid)*r/2 - 10, cy + Math.sin(mid)*r/2 + 5);
  }
}

function spinWheel() {
  if(spinning) return;
  spinning = true;
  let speed = Math.random()*0.3 + 0.2;
  let decay = 0.995;
  function animate() {
    angle += speed;
    speed *= decay;
    drawWheel();
    if(speed > 0.002) requestAnimationFrame(animate);
    else {
      spinning = false;
      let winner = Math.floor(((2*Math.PI - angle % (2*Math.PI)) / (2*Math.PI)) * n);
      ctx.fillStyle='black';
      ctx.font='30px Arial';
      ctx.fillText("Result: "+sections[winner], 200, 380);
    }
  }
  animate();
}
