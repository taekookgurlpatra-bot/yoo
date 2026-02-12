const wheel = document.getElementById("wheel");
const tickSound = document.getElementById("tick-sound");
const popup = document.getElementById("popup");
const dareTitle = document.getElementById("dare-title");
const okBtn = document.getElementById("okBtn");
const menuBtn = document.getElementById("menuBtn");

let spinning = false;

const dares = [
"Click a cute selfie 💗",
"Give me 5 sweet compliments 🥺",
"Draw something that reminds you of us 🎨",
"Write a tiny love note 💌",
"Send a random cute photo 📸",
"TRY AGAIN !!"
];

function spinWheel(){

if(spinning) return;
spinning = true;

tickSound.currentTime = 0;
tickSound.volume = 0.8;
tickSound.playbackRate = 1;
tickSound.play();

const randomRotation = 360*6 + Math.floor(Math.random()*360);

wheel.style.transform = `rotate(${randomRotation}deg)`;

setTimeout(slowDownTick,9000);

setTimeout(()=>{
tickSound.pause();
tickSound.currentTime=0;
spinning=false;

const resultIndex = Math.floor(Math.random()*dares.length);
showDare(dares[resultIndex]);

},14000);

}

function slowDownTick(){

let interval = setInterval(()=>{

if(tickSound.playbackRate>0.4){
tickSound.playbackRate -=0.05;
}

if(tickSound.volume>0.1){
tickSound.volume -=0.05;
}else{
clearInterval(interval);
}

},300);

}

function showDare(dare){

popup.style.display="flex";
dareTitle.innerText=dare;

if(dare==="TRY AGAIN !!"){
okBtn.innerText="Spin Again 💫";
okBtn.onclick=()=>{
popup.style.display="none";
};
}
else{
okBtn.innerText="Okay 💖";
okBtn.onclick=()=>{
popup.style.display="none";
};
}

menuBtn.onclick=()=>{
location.href="../funzone.html";
};

}
