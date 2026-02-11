window.addEventListener("DOMContentLoaded", () => {

    const message = "You’re my favorite hello and my sweetest forever 💖✨";
    const typingElement = document.getElementById("typing-text");

    let index = 0;

    function typeEffect() {
        if (index < message.length) {
            typingElement.textContent += message.charAt(index);
            index++;
            setTimeout(typeEffect, 60);
        } else {

            // Automatically change page after typing ends
            setTimeout(() => {
                window.location.replace("proposal.html");
            }, 1500);

        }
    }

    typeEffect();

});
