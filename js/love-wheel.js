const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const popup = document.getElementById("popup");
const dareText = document.getElementById("dareText");

const tickSound = new Audio("../assets/sounds/tick.mp3");

let rotation = 0;

const dares = [
"Take a cute selfie 📸",
"Give 5 compliments ❤️",
"Send a cute photo 🌸",
"Draw a heart 💗",
"Write a love note 💌",
"TRY AGAIN"
];

spinBtn.onclick = () => {

spinBtn.disabled = true;

tickSound.currentTime = 0;
tickSound.volume = 1;
tickSound.play().catch(()=>{});

const index = Math.floor(Math.random()*dares.length);

const segment = 360/dares.length;
const spins = 6;

rotation += 360*spins + index*segment;

wheel.style.transform = `rotate(${rotation}deg)`;

/* sound fade after 5 sec */
setTimeout(()=>{
let fade = setInterval(()=>{
if(tickSound.volume > 0.1){
tickSound.volume -= 0.05;
}else{
clearInterval(fade);
}
},300);
},5000);

/* popup */
setTimeout(()=>{

tickSound.pause();

popup.style.display="flex";

if(dares[index] === "TRY AGAIN"){
dareText.innerHTML="<h2>TRY AGAIN !!</h2>";
}
else{
dareText.innerHTML=`
<h2>${dares[index]}</h2>
<p>
1. Screenshot 🤭<br>
2. DO IT !! 😡😡<br>
3. Send to Debu 🤭✨
</p>
`;
}

spinBtn.disabled=false;

},14000);

};

function closePopup(){
popup.style.display="none";
}
