const inp = document.getElementById('inp')
const copy = document.getElementById('copy')
const lock = document.getElementById('lock')
const range = document.getElementById('range')
const rangeValue = document.getElementById('rangeValue')
const num = document.getElementById('num')
const upper = document.getElementById('upper')
const lower = document.getElementById('lower')
const special = document.getElementById('special')
const generate = document.getElementById('generate')

let passwordLength = range.value
rangeValue.innerHTML = passwordLength

range.addEventListener('input', () => {
    rangeValue.innerHTML = range.value
    passwordLength = range.value
})

let numbers = '1234567890'
let upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
let lowerChars = 'abcdefghijklmnopqrstuvwxyz'
let symbols = '!@#$%&*'

const generatePassword = () => {
    let charPool = ''
    let password = []

    if (num.checked) {
        const ch = numbers[Math.floor(Math.random() * numbers.length)]
        password.push(ch)
        charPool += numbers
    }
    if (upper.checked) {
        const ch = upperChars[Math.floor(Math.random() * upperChars.length)]
        password.push(ch)
        charPool += upperChars
    }
    if (lower.checked) {
        const ch = lowerChars[Math.floor(Math.random() * lowerChars.length)]
        password.push(ch)
        charPool += lowerChars
    }
    if (special.checked) {
        const ch = symbols[Math.floor(Math.random() * symbols.length)]
        password.push(ch)
        charPool += symbols
    }

    if (!charPool) {
        alert('Please select at least one option')
        return
    }

    while (password.length < passwordLength) {
        const rand = charPool[Math.floor(Math.random() * charPool.length)]
        password.push(rand)
    }

    // Shuffle
    for (let i = 0; i < password.length; i++) {
        const j = Math.floor(Math.random() * password.length)
            ;[password[i], password[j]] = [password[j], password[i]]
    }

    inp.value = password.join('')
}

generate.addEventListener('click', () => {
    generatePassword()
})

copy.addEventListener('click', () => {
    if (inp.value) {
        navigator.clipboard.writeText(inp.value)
        alert('password copied')
        inp.select()

    }
})



lock.addEventListener('click', () => {
    if (inp.type === 'password') {
        inp.type = 'text'

    } else {
        inp.type = 'password'

    }
})

