let shown = false;

window.addEventListener("scroll", () => {

    if (shown) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {

        shown = true;

        setTimeout(() => {
            alert("Two halves, one heartbeat 🥹💗");
        }, 300);

    }
});
