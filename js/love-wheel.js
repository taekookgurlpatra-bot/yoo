const spinBtn = document.getElementById('spinBtn');
const wheelDare = document.getElementById('wheel-dare');
const dareBox = document.getElementById('dare-box');
const dareText = document.getElementById('dare-text');
const okDare = document.getElementById('okDare');

const dares = [
    "Take a selfie and send it! 📸",
    "Give 5 compliments 💖",
    "Draw a heart and share it ✏️",
    "Write a short love note 💌",
    "Send a cute photo 🌸"
];

// Spin the wheel
spinBtn.addEventListener('click', () => {
    const randomDare = dares[Math.floor(Math.random()*dares.length)];
    // Show dare in pop-up box
    dareText.textContent = randomDare;
    dareBox.style.display = "flex";
    wheelDare.textContent = "";
});

// Okay button → back to Fun Zone
okDare.addEventListener('click', () => {
    window.location.href = '../funzone.html';
});
