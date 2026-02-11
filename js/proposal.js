const noBtn = document.getElementById("noBtn");
const convinceText = document.getElementById("convince-text");

const messages = [
    "C’mon 😭",
    "Are you sure qt? 🥺",
    "Think again 💕",
    "I’ll be sad 😢",
    "You know you want to 😉",
    "Pleaseeeee 💖"
];

noBtn.addEventListener("mouseover", () => {

    // Move button randomly
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    // Show random convincing text
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    convinceText.textContent = randomMsg;
});

function sayYes() {
    alert("YAYYYY 💕 I love you!!!");
}
