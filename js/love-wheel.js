const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const sound = document.getElementById("spinSound");

let spinning = false;

spinBtn.onclick = () => {

if(spinning) return;

spinning = true;

/* RANDOM ROTATION */
let randomDeg = 3600 + Math.floor(Math.random()*360);

/* APPLY SPIN */
wheel.style.transform = `rotate(${randomDeg}deg)`;

/* PLAY SOUND */
sound.currentTime = 0;
sound.play();

/* STOP SOUND AFTER 14 SEC */
setTimeout(()=>{
sound.pause();
spinning = false;
},14000);

};
