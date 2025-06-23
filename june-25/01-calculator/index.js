

const inp = document.getElementById('inp')
const buttons = document.querySelectorAll('button')





//  factorial fucntion
const factorial = (n) => {
    if (n === 1 || n === 0) {
        return 1
    } else {
        return n * factorial(n - 1)
    }
}

inp.value = ''

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.innerHTML === 'AC') {
            inp.value = ''
        }
        else if (btn.innerHTML === 'DEL') {
            inp.value = inp.value.slice(0, -1)
        }

        else if (btn.innerHTML === '!') {
            inp.value = factorial(parseInt(inp.value))
        }
        else if (btn.innerHTML === '=') {
            inp.value = eval(inp.value)
        }
        else {
            inp.value += btn.innerHTML
        }

    })
})