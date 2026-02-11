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

// Make NO button run away
noBtn.addEventListener("mouseover", () => {

    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    convinceText.textContent = randomMsg;
});


// YES button popup → Menu Page
function sayYes() {

    alert("YAYYYY 💕 I knew you would say yes!!!");

    window.location.href = "menu.html";
}
