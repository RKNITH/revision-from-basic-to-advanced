

const inp = document.getElementById('inp');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const resume = document.getElementById('resume');
const reset = document.getElementById('reset');

let timerId = null;

start.disabled = false;
pause.disabled = true;
resume.disabled = true;


// Format single digits with leading zero
const formatTime = (time) => (time < 10 ? `0${time}` : `${time}`);


let sec = 0
let min = 0
let hour = 0

// Start countdown
start.addEventListener('click', () => {

    start.disabled = true;
    pause.disabled = false;
    resume.disabled = false;



    if (!timerId) {

        timerId = setInterval(() => {
            sec++
            if (sec > 59) {
                sec = 0
                min++
                if (min > 59) {
                    min = 0
                    hour++
                }
            }
            inp.value = `${formatTime(hour)} : ${formatTime(min)} : ${formatTime(sec)}`


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

    if (!timerId) {

        timerId = setInterval(() => {
            sec++
            if (sec > 59) {
                sec = 0
                min++
                if (min > 59) {
                    min = 0
                    hour++
                }
            }
            inp.value = `${formatTime(hour)} : ${formatTime(min)} : ${formatTime(sec)}`


        }, 1000);
    }
});


reset.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;

    sec = 0
    min = 0
    hour = 0
    inp.value = `${formatTime(hour)} : ${formatTime(min)} : ${formatTime(sec)}`


    start.disabled = false;
    pause.disabled = true;
    resume.disabled = true;
});