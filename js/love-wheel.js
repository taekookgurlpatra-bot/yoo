const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spinBtn");
const popup = document.getElementById("darePopup");
const dareText = document.getElementById("dareText");
const okayBtn = document.getElementById("okayBtn");
const backBtn = document.getElementById("backBtn");

let currentRotation = 0;

const tickSound = new Audio("../assets/sounds/tick.mp3");
tickSound.loop = false;

const dares = [
    "Take a cute selfie 📸",
    "Give 5 compliments ❤️",
    "Send a cute photo 🌸",
    "Draw a heart 💗",
    "Write a love note 💌",
    "TRY AGAIN"
];

const segmentAngle = 360 / dares.length;

spinBtn.addEventListener("click", spinWheel);

function spinWheel() {

    spinBtn.disabled = true;

    tickSound.currentTime = 0;
    tickSound.volume = 1;
    tickSound.play().catch(()=>{});

    const randomIndex = Math.floor(Math.random() * dares.length);

    const extraSpins = 7;

    const finalAngle =
        (360 * extraSpins) +
        (randomIndex * segmentAngle) +
        (segmentAngle / 2);

    currentRotation += finalAngle;

    /*
    Custom easing:
    Fast start
    Maintain speed
    Slow down gradually after 5 sec
    */
    wheel.style.transition =
        "transform 14s cubic-bezier(0.15, 0.85, 0.25, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;


    // 🎵 Gradual sound slowdown starting at 5 sec
    setTimeout(() => {

        let slowInterval = setInterval(() => {

            if (tickSound.playbackRate > 0.4) {
                tickSound.playbackRate -= 0.05;
            }

            if (tickSound.volume > 0.1) {
                tickSound.volume -= 0.04;
            }

            if (tickSound.playbackRate <= 0.4) {
                clearInterval(slowInterval);
            }

        }, 400);

    }, 5000);


    // Stop everything at 14 sec
    setTimeout(() => {

        tickSound.pause();
        tickSound.currentTime = 0;
        tickSound.volume = 1;
        tickSound.playbackRate = 1;

        showDare(dares[randomIndex]);
        spinBtn.disabled = false;

    }, 14000);
}

function showDare(dare) {

    popup.style.display = "flex";

    if (dare === "TRY AGAIN") {

        dareText.innerHTML = `<h2>TRY AGAIN !!</h2>`;

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

okayBtn.onclick = () => {
    popup.style.display = "none";
};

backBtn.onclick = () => {
    window.location.href = "../funzone.html";
};
