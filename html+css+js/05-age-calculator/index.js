const year = document.getElementById('year');
const month = document.getElementById('month');
const day = document.getElementById('day');
const result = document.getElementById('result');
const calculate = document.getElementById('calculate');

// Function to check for leap year
const isLeapYear = (y) => {
    return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
};

// Get number of days in a given month and year
const getDaysInMonth = (y, m) => {
    const daysInMonth = [31, isLeapYear(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[m];
};

const calculateAge = () => {
    const birthYear = parseInt(year.value);
    const birthMonth = parseInt(month.value) - 1; // 0-based
    const birthDay = parseInt(day.value);

    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
        return "Please enter all values.";
    }

    if (birthMonth < 0 || birthMonth > 11) {
        return "Month must be between 1 and 12.";
    }

    const maxDays = getDaysInMonth(birthYear, birthMonth);
    if (birthDay < 1 || birthDay > maxDays) {
        return `Invalid day for the selected month. Max is ${maxDays}.`;
    }

    const birthDate = new Date(birthYear, birthMonth, birthDay);
    const today = new Date();

    if (birthDate > today) {
        return "Birth date can't be in the future.";
    }

    let ageYear = today.getFullYear() - birthDate.getFullYear();
    let ageMonth = today.getMonth() - birthDate.getMonth();
    let ageDay = today.getDate() - birthDate.getDate();

    if (ageDay < 0) {
        ageMonth -= 1;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        ageDay += previousMonth.getDate();
    }

    if (ageMonth < 0) {
        ageYear -= 1;
        ageMonth += 12;
    }

    return `${ageYear} years, ${ageMonth} months, ${ageDay} days`;
};

calculate.addEventListener('click', () => {
    const age = calculateAge();
    result.style.display = 'block';
    result.innerHTML = age;
});
