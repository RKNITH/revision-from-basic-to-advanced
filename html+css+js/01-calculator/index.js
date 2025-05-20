
const inp = document.getElementById('inp')
const buttons = document.querySelectorAll('button')



const displayBtn = Array.from(buttons)

inp.value = ''
displayBtn.forEach(btn => {

    btn.addEventListener('click', () => {
        if (btn.innerHTML === 'AC') {
            inp.value = ''
        }
        else if (btn.innerHTML === 'DEL') {
            inp.value = inp.value.slice(0, -1)
        }
        else if (btn.innerHTML === '=') {
            inp.value = eval(inp.value)
        }
        else {
            inp.value += btn.innerHTML
        }

    })
})