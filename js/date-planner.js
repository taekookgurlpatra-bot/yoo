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
"Your date vibe is soft, warm and full of comfort 🧸💕 Perfect for emotional talks and peaceful bonding 🌙💞";

}

else if(score <= 15){

resultTitle.innerText = "💖 Romantic Dream Date 💖";
resultRemark.innerText =
"This date is giving butterflies and magical moments 🦋❤️ Full romantic energy and sweet memories together ✨🥰";

}

else{

resultTitle.innerText = "🔥 Passionate Fun Date 🔥";
resultRemark.innerText =
"This date is exciting and playful 😍🎉 Lots of teasing, laughter and unforgettable romantic chaos 💞💫";

}

}

function restartGame(){
location.reload();
}

function goBack(){
window.location.href="../funzone.html";
}

loadQuestion();
