const card = document.getElementById("card");
const button = document.getElementById("drawBtn");
const sound = document.getElementById("cardSound");

const fortunes = [

"Take a cute selfie together 📸",
"Say 3 things you love about each other ❤️",
"Send a romantic text right now 💌",
"Draw a heart for your partner 💖",
"Give a virtual hug 🤗",
"Sing one romantic song line 🎶",
"Share your favourite memory together ✨",
"Tell a secret crush moment 😳"

];

button.onclick = () => {

let random = fortunes[Math.floor(Math.random()*fortunes.length)];

card.classList.add("flip");

sound.currentTime = 0;
sound.play();

setTimeout(()=>{
card.innerText = random;
card.classList.remove("flip");
},300);

};
