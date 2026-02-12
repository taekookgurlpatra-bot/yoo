const questions = [

{
q:"Choose Date Type 💕",
options:[
"Movie Night 🎬",
"Romantic Dinner 🍝",
"Long Walk 🌙",
"Voice Call ☎️"
]
},

{
q:"Pick Food 🍰",
options:[
"Pizza 🍕",
"Ice Cream 🍦",
"Pasta 🍝",
"Chocolate 🍫"
]
},

{
q:"Choose Activity 🎀",
options:[
"Watch Stars ✨",
"Play Games 🎮",
"Listen Music 🎧",
"Talk About Memories 💌"
]
}

];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const popup = document.getElementById("resultPopup");
const resultText = document.getElementById("resultText");
const resultRemark = document.getElementById("resultRemark");

function loadQuestion(){

let q = questions[currentQuestion];

questionText.innerText = q.q;
optionsBox.innerHTML = "";

q.options.forEach((opt,index)=>{

let btn = document.createElement("button");
btn.innerText = opt;
btn.classList.add("option-btn");

btn.onclick = ()=>{
score += index + 1;
nextQuestion();
};

optionsBox.appendChild(btn);

});
}

function nextQuestion(){

currentQuestion++;

if(currentQuestion < questions.length){
loadQuestion();
}
else{
showResult();
}

}

function showResult(){

popup.classList.remove("hidden");

/* RESULT CATEGORY */

if(score <= 6){

resultText.innerText = "✨ Sweet & Simple Date ✨";
resultRemark.innerText =
"Your date vibe is calm, cute and cozy 🧸💕 Perfect for heart-to-heart talks and warm smiles 🫶🌙";

}

else if(score <= 9){

resultText.innerText = "💖 Romantic Dream Date 💖";
resultRemark.innerText =
"OMG this date is giving butterflies 🦋❤️ Soft romance, laughter and magical moments together ✨🥰";

}

else{

resultText.innerText = "🔥 Passionate Fun Date 🔥";
resultRemark.innerText =
"This date is FULL energy 😍🎉 Lots of excitement, teasing, fun and unforgettable memories 💞💫";

}

}

/* Buttons */

function restartGame(){
location.reload();
}

function goBack(){
window.location.href = "../funzone.html";
}

loadQuestion();
