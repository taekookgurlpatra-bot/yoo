const questions = [

{
question:"Choose Date Type 💕",
options:[
"Movie Night 🎬",
"Romantic Dinner 🍝",
"Long Walk 🌙",
"Voice Call ☎️"
]
},

{
question:"Pick Food 🍰",
options:[
"Pizza 🍕",
"Ice Cream 🍦",
"Pasta 🍝",
"Chocolate 🍫"
]
},

{
question:"Choose Outfit Style 👗",
options:[
"Casual Cute 🌸",
"Elegant Romantic 💃",
"Comfy Cozy 🧸",
"Matching Outfit 💞"
]
},

{
question:"Choose Activity 🎀",
options:[
"Watch Stars ✨",
"Play Games 🎮",
"Listen Music 🎧",
"Talk About Memories 💌"
]
},

{
question:"Choose Ending Moment 💖",
options:[
"Virtual Hug 🤗",
"Sweet Compliments ❤️",
"Flirty Teasing 😏",
"Deep Emotional Talk 🌙"
]
}

];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");

const popup = document.getElementById("resultPopup");
const resultTitle = document.getElementById("resultTitle");
const resultRemark = document.getElementById("resultRemark");

function loadQuestion(){

let q = questions[currentQuestion];

questionEl.innerText = q.question;
optionsEl.innerHTML = "";

q.options.forEach((option,index)=>{

let btn = document.createElement("button");
btn.innerText = option;
btn.classList.add("option-btn");

btn.onclick = ()=>{
score += index + 1;
nextQuestion();
};

optionsEl.appendChild(btn);

});
}

function nextQuestion(){

currentQuestion++;

if(currentQuestion < questions.length){
loadQuestion();
}else{
showResult();
}
}

function showResult(){

popup.classList.remove("hidden");

if(score <= 10){

resultTitle.innerText = "✨ Sweet Cozy Date ✨";
resultRemark.innerText =
"Soft, warm and comforting vibes 🧸💕 Perfect for peaceful bonding and heartfelt talks 🌙";

}
else if(score <= 15){

resultTitle.innerText = "💖 Romantic Dream Date 💖";
resultRemark.innerText =
"Butterflies, magic and adorable romantic energy 🦋❤️ Full dreamy memories together ✨";

}
else{

resultTitle.innerText = "🔥 Passionate Fun Date 🔥";
resultRemark.innerText =
"Playful, exciting and full of teasing laughter 😍🎉 A chaotic but unforgettable love vibe 💞";

}
}

function restartGame(){
location.reload();
}

function goBack(){
window.location.href="../funzone.html";
}

loadQuestion();
