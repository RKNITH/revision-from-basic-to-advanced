const inp = document.getElementById('inp');
const workTime = document.getElementById('work');
const shortBreakTime = document.getElementById('shortBreak');
const longBreakTime = document.getElementById('longBreak');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');
const reset = document.getElementById('reset');
const header = document.getElementById('header');
const countDisplay = document.getElementById('count');

let timerId = null;
let timerValue = 0;
let sessionCount = 0;
let rounds = 0;
let currentPhase = 'work';
let paused = false;

// Format time
const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

// Convert to HH:MM:SS
const displayTime = (timeValue) => {
    let sec = Math.floor(timeValue % 60);
    let min = Math.floor((timeValue / 60) % 60);
    let hour = Math.floor(timeValue / 3600);
    return `${formatTime(hour)} : ${formatTime(min)} : ${formatTime(sec)}`;
};

// Save values to LocalStorage
const saveToLocalStorage = () => {
    localStorage.setItem('workTime', workTime.value);
    localStorage.setItem('shortBreakTime', shortBreakTime.value);
    localStorage.setItem('longBreakTime', longBreakTime.value);
    localStorage.setItem('rounds', rounds);
};

// Load values from LocalStorage
const loadFromLocalStorage = () => {
    if (localStorage.getItem('workTime')) workTime.value = localStorage.getItem('workTime');
    if (localStorage.getItem('shortBreakTime')) shortBreakTime.value = localStorage.getItem('shortBreakTime');
    if (localStorage.getItem('longBreakTime')) longBreakTime.value = localStorage.getItem('longBreakTime');
    if (localStorage.getItem('rounds')) {
        rounds = parseInt(localStorage.getItem('rounds'));
        countDisplay.textContent = rounds;
    }
};

// Start timer logic
const startTimer = (duration, phase) => {
    timerValue = duration;
    inp.value = displayTime(timerValue);
    header.textContent = phase === 'work' ? 'Work Time' : (phase === 'shortBreak' ? 'Short Break' : 'Long Break');

    timerId = setInterval(() => {
        timerValue--;
        inp.value = displayTime(timerValue);

        if (timerValue <= 0) {
            clearInterval(timerId);
            timerId = null;

            if (phase === 'work') {
                sessionCount++;
                if (sessionCount % 4 === 0) {
                    currentPhase = 'longBreak';
                    startTimer(parseInt(longBreakTime.value), 'longBreak');
                    rounds++;
                    countDisplay.textContent = rounds;
                    saveToLocalStorage();
                } else {
                    currentPhase = 'shortBreak';
                    startTimer(parseInt(shortBreakTime.value), 'shortBreak');
                }
            } else {
                currentPhase = 'work';
                startTimer(parseInt(workTime.value), 'work');
            }
        }
    }, 1000);
};

// START
start.addEventListener('click', () => {
    const work = parseInt(workTime.value);
    const shortB = parseInt(shortBreakTime.value);
    const longB = parseInt(longBreakTime.value);

    if ([work, shortB, longB].some(val => isNaN(val) || val <= 0)) {
        alert('Please enter valid time in seconds for all fields.');
        return;
    }

    saveToLocalStorage();

    start.disabled = true;
    pause.disabled = false;
    resume.disabled = true;

    sessionCount = 0;
    rounds = parseInt(localStorage.getItem('rounds')) || 0;
    countDisplay.textContent = rounds;
    currentPhase = 'work';

    startTimer(work, 'work');
});

// PAUSE
pause.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId);
        paused = true;
        timerId = null;
        pause.disabled = true;
        resume.disabled = false;
    }
});

// RESUME
resume.addEventListener('click', () => {
    if (!timerId && paused && timerValue > 0) {
        paused = false;
        pause.disabled = false;
        resume.disabled = true;
        startTimer(timerValue, currentPhase);
    }
});

// RESET
reset.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timerValue = 0;
    sessionCount = 0;
    rounds = 0;
    paused = false;
    currentPhase = 'work';

    inp.value = '00 : 00 : 00';
    header.textContent = 'Pomodoro';
    countDisplay.textContent = '0';

    workTime.value = '';
    shortBreakTime.value = '';
    longBreakTime.value = '';

    localStorage.clear();

    start.disabled = false;
    pause.disabled = true;
    resume.disabled = true;
});

// Load saved values on page load
window.addEventListener('DOMContentLoaded', loadFromLocalStorage);
