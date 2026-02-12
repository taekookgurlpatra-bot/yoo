window.addEventListener("DOMContentLoaded", () => {

const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const popup = document.getElementById("darePopup");
const dareText = document.getElementById("dareText");
const okayBtn = document.getElementById("okayBtn");
const backBtn = document.getElementById("backBtn");

let currentRotation = 0;

const tickSound = new Audio("../assets/sounds/tick.mp3");

const dares = [
"Take a cute selfie 📸",
"Give 5 compliments ❤️",
"Send a cute photo 🌸",
"Draw a heart 💗",
"Write a love note 💌",
"TRY AGAIN"
];

spinBtn.addEventListener("click", () => {

spinBtn.disabled = true;

tickSound.currentTime = 0;
tickSound.play().catch(()=>{});

const randomIndex = Math.floor(Math.random()*dares.length);

const segment = 360 / dares.length;
const spins = 6;

const finalRotation =
360*spins +
(randomIndex*segment) +
(segment/2);

currentRotation += finalRotation;

wheel.style.transform = `rotate(${currentRotation}deg)`;

/* Stop after 14 sec */
setTimeout(()=>{
tickSound.pause();
showDare(dares[randomIndex]);
spinBtn.disabled = false;
},14000);

});

function showDare(dare){

popup.style.display = "flex";

if(dare === "TRY AGAIN"){
dareText.innerHTML = "<h2>TRY AGAIN !!</h2>";
}
else{
dareText.innerHTML = `
<h2>${dare}</h2>
<p>
Instructions to complete it:<br>
1. Take a screenshot 🤭<br>
2. DO IT !! 😡😡<br>
3. Send it to DEBU 🤭✨🌙
</p>
`;
}

}

okayBtn.onclick = ()=>{
popup.style.display="none";
};

backBtn.onclick = ()=>{
window.location.href="../funzone.html";
};

});
