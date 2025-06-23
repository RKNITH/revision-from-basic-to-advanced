const inp = document.getElementById('inp');
const inpValue = document.getElementById('inpValue');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');
const reset = document.getElementById('reset');

let timerId = null;
let timerValue = 0;


start.disabled = false;
pause.disabled = true;
resume.disabled = true;


// Format single digits with leading zero
const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);

// Convert seconds to HH:MM:SS
const displayTime = (timeValue) => {
    let sec = Math.floor(timeValue % 60);
    let min = Math.floor((timeValue / 60) % 60);
    let hour = Math.floor(timeValue / 3600);
    return `${formatTime(hour)} : ${formatTime(min)} : ${formatTime(sec)}`;
};

// Start countdown
start.addEventListener('click', () => {
    if (inpValue.value === '' || parseInt(inpValue.value) <= 0) {
        alert('Please enter a valid time in seconds');
        return;
    }
    start.disabled = true;
    pause.disabled = false;
    resume.disabled = false;


    // Prevent multiple intervals
    if (!timerId) {
        timerValue = parseInt(inpValue.value);
        inp.value = displayTime(timerValue);

        timerId = setInterval(() => {
            timerValue--;
            inp.value = displayTime(timerValue);

            if (timerValue < 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Time\'s up!');
                inp.value = '00 : 00 : 00';

                start.disabled = false;
                pause.disabled = true;
                resume.disabled = true;

            }
        }, 1000);
    }
});

// Pause countdown
pause.addEventListener('click', () => {
    pause.disabled = true;
    resume.disabled = false;

    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
});

// Resume countdown
resume.addEventListener('click', () => {
    resume.disabled = true;
    pause.disabled = false;

    if (!timerId && timerValue > 0) {
        timerId = setInterval(() => {
            timerValue--;
            inp.value = displayTime(timerValue);

            if (timerValue < 0) {
                clearInterval(timerId);
                timerId = null;
                alert('Time\'s up!');
                inp.value = '00 : 00 : 00';
            }
        }, 1000);
    }
});


reset.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timerValue = 0;

    inp.value = '00 : 00 : 00';
    inpValue.value = '';

    start.disabled = false;
    pause.disabled = true;
    resume.disabled = true;
});