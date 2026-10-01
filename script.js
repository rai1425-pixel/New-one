const button = document.getElementById("gameButton");
const message = document.getElementById("message");

const lastDisplay = document.getElementById("last");
const bestDisplay = document.getElementById("best");
const averageDisplay = document.getElementById("average");

let startTime = 0;
let timeout = null;
let results = [];
let state = "start";

button.addEventListener("click", () => {

    if (state === "start" || state === "finished") {
        startGame();
    }

    else if (state === "waiting") {
        clearTimeout(timeout);

        message.textContent = "Too early! 😅";
        button.textContent = "TRY AGAIN";
        button.className = "";
        state = "finished";
    }

    else if (state === "ready") {
        const reactionTime = performance.now() - startTime;

        results.push(reactionTime);

        lastDisplay.textContent = `${Math.round(reactionTime)} ms`;

        const best = Math.min(...results);
        bestDisplay.textContent = `${Math.round(best)} ms`;

        const average =
            results.reduce((sum, time) => sum + time, 0) / results.length;

        averageDisplay.textContent = `${Math.round(average)} ms`;

        message.textContent = "Nice! Try again.";
        button.textContent = "GO AGAIN";
        button.className = "";

        state = "finished";
    }
});

function startGame() {
    state = "waiting";

    button.textContent = "WAIT...";
    button.className = "waiting";

    message.textContent = "Wait for GREEN...";

    const delay = Math.random() * 3000 + 2000;

    timeout = setTimeout(() => {
        state = "ready";

        button.textContent = "TAP!";
        button.className = "ready";

        message.textContent = "GO!";

        startTime = performance.now();
    }, delay);
}
