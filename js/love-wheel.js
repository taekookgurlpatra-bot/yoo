const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");

const popup = document.getElementById("dare-popup");
const dareText = document.getElementById("dare-text");
const instructions = document.getElementById("instructions");

const okBtn = document.getElementById("ok-btn");
const backBtn = document.getElementById("back-btn");

const tickSound = document.getElementById("tick-sound");
const gameBox = document.getElementById("game-box");

let selectedDare = "";
let spinning = false;

const dares = [
"Take a selfie 📸",
"Give 5 compliments 💖",
"Try Again",
"Write a love note 💌",
"Draw a heart ✏️",
"Draw a cute photo 🎨"
];

spinBtn.addEventListener("click",()=>{

if(spinning) return;

spinning = true;

/* Play tick sound */
tickSound.currentTime = 0;
tickSound.play();

const segment = 360/dares.length;
const randomIndex = Math.floor(Math.random()*dares.length);

selectedDare = dares[randomIndex];

const spins = 5 + Math.floor(Math.random()*4);
const degree = spins*360 + randomIndex*segment + segment/2;

wheel.style.transform = `rotate(${degree}deg)`;

setTimeout(()=>{

spinning=false;
tickSound.pause();

/* Blur background */
gameBox.classList.add("blur");

if(selectedDare === "Try Again"){
dareText.innerText="TRY AGAIN !!";
instructions.style.display="none";
backBtn.style.display="none";
}
else{
dareText.innerText=selectedDare;
instructions.style.display="block";
backBtn.style.display="inline-block";
}

/* Show popup */
popup.classList.remove("hidden");
popup.classList.add("popup-show");

/* Launch confetti */
launchConfetti();

},4000);

});


/* OK BUTTON */
okBtn.addEventListener("click",()=>{

popup.classList.add("hidden");
gameBox.classList.remove("blur");
wheel.style.transform="rotate(0deg)";

});


/* BACK BUTTON */
backBtn.addEventListener("click",()=>{
window.location.href="funzone.html";
});


/* CONFETTI */
function launchConfetti(){

const container = document.getElementById("confetti-container");

for(let i=0;i<30;i++){

let conf = document.createElement("div");
conf.classList.add("confetti");

conf.style.left = Math.random()*100+"%";
conf.style.animationDuration = 2 + Math.random()*2 + "s";

container.appendChild(conf);

setTimeout(()=> conf.remove(),4000);
}
}
