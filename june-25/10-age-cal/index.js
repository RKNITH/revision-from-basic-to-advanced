


const birthYear = document.getElementById('birthYear');
const birthMonth = document.getElementById('birthMonth');
const birthDay = document.getElementById('birthDay');
const result = document.getElementById('result');
const calculate = document.getElementById('calculate');

// Days in months (index 0 = January, 11 = December)
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const isLeapYear = (year) => {
    return ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0));
};

const today = new Date();
const currentDate = today.getDate();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const calculateAge = () => {
    const birthDays = parseInt(birthDay.value, 10);
    const birthMonths = parseInt(birthMonth.value, 10);
    const birthYears = parseInt(birthYear.value, 10);

    if (isNaN(birthDays) || isNaN(birthMonths) || isNaN(birthYears) ||
        birthDays < 1 || birthDays > 31 ||
        birthMonths < 1 || birthMonths > 12 ||
        birthYears < 0) {
        result.innerHTML = "Please enter valid date values.";
        return;
    }

    let days = currentDate;
    let month = currentMonth;
    let year = currentYear;

    // Check if current day is less than birth day
    if (days < birthDays) {
        // Get days in previous month
        const prevMonth = month === 1 ? 12 : month - 1;
        const daysInPreviousMonth = (isLeapYear(year) && prevMonth === 2) ? 29 : daysInMonth[prevMonth - 1];
        days += daysInPreviousMonth;
        month--;
        if (month === 0) {
            month = 12;
            year--;
        }
    }
    days -= birthDays;

    // Check if current month is less than birth month
    if (month < birthMonths) {
        month += 12;
        year--;
    }
    month -= birthMonths;

    year -= birthYears;

    result.innerHTML = `${year} years ${month} months ${days} days`;
};

calculate.addEventListener('click', calculateAge);
