const inp = document.getElementById('inp');
const copy = document.getElementById('copy');
const generate = document.getElementById('generate');
const range = document.getElementById('range');
const rangeCheckbox = document.getElementById('rangeCheckbox');
const numberCheckbox = document.getElementById('numberCheckbox');
const letterCheckbox = document.getElementById('letterCheckbox');
const symbolCheckbox = document.getElementById('symbolCheckbox');

// Character pools
const numbers = '1234567890';
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '@#$%&';

range.addEventListener('input', () => {
    rangeCheckbox.textContent = range.value;
});

// Shuffle function (Fisher–Yates algorithm)
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function generatePassword() {
    let charSet = '';
    const selectedTypes = [];

    if (numberCheckbox.checked) {
        charSet += numbers;
        selectedTypes.push(numbers);
    }

    if (letterCheckbox.checked) {
        charSet += letters;
        selectedTypes.push(letters);
    }

    if (symbolCheckbox.checked) {
        charSet += symbols;
        selectedTypes.push(symbols);
    }

    const passwordLength = parseInt(range.value);

    if (charSet.length === 0 || passwordLength === 0) {
        return '';
    }

    let generated = [];

    // Ensure at least one character from each selected type
    selectedTypes.forEach(type => {
        generated.push(type[Math.floor(Math.random() * type.length)]);
    });

    // Fill the rest of the password
    for (let i = generated.length; i < passwordLength; i++) {
        generated.push(charSet[Math.floor(Math.random() * charSet.length)]);
    }

    // Shuffle final password
    return shuffleString(generated.join(''));
}

// Generate button handler
generate.addEventListener('click', () => {
    const password = generatePassword();
    if (!password) {
        alert('Please select at least one option to generate a password.');
        return;
    }
    inp.value = password;
});

// Copy to clipboard handler
copy.addEventListener('click', () => {
    if (inp.value.length > 0) {
        navigator.clipboard.writeText(inp.value)
            .then(() => alert('Password copied to clipboard!'))
            .catch(() => alert('Failed to copy password.'));
    }
});
