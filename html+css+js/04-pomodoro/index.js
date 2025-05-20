const modes = {
    pomodoro: { time: 25, color: "#d95550" },
    "short-break": { time: 5, color: "#4c9195" },
    "long-break": { time: 15, color: "#457ca3" }
};

let currentMode = "pomodoro";
let interval;
let timeLeft = modes[currentMode].time * 60;

const buttons = document.querySelectorAll(".mode-buttons button");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startBtn = document.getElementById("start");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        switchMode(btn.id);
    });
});

startBtn.addEventListener("click", () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        startBtn.textContent = "Start";
    } else {
        interval = setInterval(countdown, 1000);
        startBtn.textContent = "Pause";
    }
});

function switchMode(mode) {
    clearInterval(interval);
    interval = null;
    startBtn.textContent = "Start";

    currentMode = mode;
    timeLeft = modes[mode].time * 60;
    document.body.style.backgroundColor = modes[mode].color;

    buttons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(mode).classList.add("active");

    updateDisplay();
}

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(interval);
        startBtn.textContent = "Start";
        return;
    }
    timeLeft--;
    updateDisplay();
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    minutesEl.textContent = String(mins).padStart(2, '0');
    secondsEl.textContent = String(secs).padStart(2, '0');
}

updateDisplay();
