document.addEventListener("DOMContentLoaded", () => {

    const hour = new Date().getHours();

    const body = document.body;

    const title = document.getElementById("greeting");

    let theme = "";
    let greeting = "";

    if (hour >= 5 && hour < 11) {
        theme = "morning";
        greeting = "Selamat Pagi 🌅";
    }
    else if (hour >= 11 && hour < 15) {
        theme = "day";
        greeting = "Selamat Siang ☀️";
    }
    else if (hour >= 15 && hour < 18) {
        theme = "afternoon";
        greeting = "Selamat Sore 🌇";
    }
    else {
        theme = "night";
        greeting = "Selamat Malam 🌙";
    }

    body.classList.add(theme);

    if (title) {
        title.textContent = greeting;
    }

});
