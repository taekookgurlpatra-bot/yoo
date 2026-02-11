const text = "You’re my favorite hello and my sweetest forever 💖✨";
const typingElement = document.getElementById("typing-text");

let index = 0;

function typeText() {
    if (index < text.length) {
        typingElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 60);
    }
}

typeText();
