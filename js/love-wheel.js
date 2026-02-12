const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const popup = document.getElementById("darePopup");
const dareText = document.getElementById("dareText");
const okayBtn = document.getElementById("okayBtn");
const backBtn = document.getElementById("backBtn");

let currentRotation = 0;

// 🎵 Sound
const tickSound = new Audio("../assets/sounds/tick.mp3");
tickSound.loop = true;

const dares = [
    "Take a cute selfie 📸",
    "Give 5 compliments ❤️",
    "Send a cute photo 🌸",
    "Draw a heart 💗",
    "Write a love note 💌",
    "TRY AGAIN"
];

// Each segment = 360 / 6 = 60 degrees
const segmentAngle = 60;

spinBtn.addEventListener("click", spinWheel);

function spinWheel() {

    spinBtn.disabled = true;

    // Reset sound
    tickSound.currentTime = 0;
    tickSound.volume = 1;
    tickSound.play().catch(()=>{});

    // Random segment
    const randomIndex = Math.floor(Math.random() * dares.length);

    // Random spins (adds realism)
    const extraSpins = 5 + Math.floor(Math.random() * 3);

    const finalAngle =
        (360 * extraSpins) +
        (randomIndex * segmentAngle) +
        (segmentAngle / 2);

    currentRotation += finalAngle;

    wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // 🎵 Gradually slow sound
    let fadeInterval = setInterval(() => {
        if (tickSound.volume > 0.05) {
            tickSound.volume -= 0.05;
        } else {
            tickSound.pause();
            clearInterval(fadeInterval);
        }
    }, 300);

    setTimeout(() => {

        showDare(dares[randomIndex]);
        spinBtn.disabled = false;

    }, 5000);
}

function showDare(dare) {

    popup.style.display = "flex";

    if (dare === "TRY AGAIN") {

        dareText.innerHTML = `
        <h2>TRY AGAIN !!</h2>
        `;

    } else {

        dareText.innerHTML = `
        <h2>${dare}</h2>
        <p style="margin-top:15px;">
        Instructions to complete it:<br>
        1. Take a screenshot 🤭<br>
        2. DO IT !! 😡😡<br>
        3. Send it to DEBU 🤭✨🌙
        </p>
        `;
    }
}

// OKAY → Back to game page
okayBtn.onclick = () => {
    popup.style.display = "none";
};

// BACK → Funzone menu
backBtn.onclick = () => {
    window.location.href = "../funzone.html";
};
