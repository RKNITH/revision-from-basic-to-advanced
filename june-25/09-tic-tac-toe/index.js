
const games = document.querySelectorAll('.game');
const restart = document.getElementById('restart');
const start = document.getElementById('start');
const firstPlayer = document.getElementById('first');
const secondPlayer = document.getElementById('second');
const firstPlayerName = document.getElementById('firstPlayerName');
const secondPlayerName = document.getElementById('secondPlayerName');
const firstPlayerChoice = document.getElementById('firstPlayerChoice');
const result = document.querySelector('.result-container'); // Corrected to use querySelector

const capitalizeFirstLetter = (string) => `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

let playerTurn = 'first';
let firstPlayerChoices = '';
let secondPlayerChoices = '';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];


const checkGameStatus = () => {

    let boards = Array.from(games).map(game => game.innerHTML)

    for (let combinations of winningCombinations) {

        let [a, b, c] = combinations
        if (boards[a] && boards[a] === boards[b] && boards[b] === boards[c]) {
            return boards[a] === firstPlayerChoices ? 'first' : 'second'
        }

    }
    if (boards.every(cell => cell != '')) {
        return 'DRAW'

    }
    return null
}



start.addEventListener('click', () => {
    firstPlayerChoices = firstPlayerChoice.value.trim().toUpperCase()
    secondPlayerChoices = firstPlayerChoices === 'X' ? 'O' : 'X'
    firstPlayer.innerHTML = `${capitalizeFirstLetter(firstPlayerName.value)} : ${firstPlayerChoices}`
    secondPlayer.innerHTML = `${capitalizeFirstLetter(secondPlayerName.value)} : ${secondPlayerChoices}`


    gameActive = true
    playerTurn = 'first'
    games.forEach(game => {
        game.addEventListener('click', () => {
            if (game.innerHTML === '' && gameActive) {
                if (playerTurn === 'first') {
                    playerTurn = 'second'
                    game.innerHTML = firstPlayerChoices
                }
                else {
                    playerTurn = 'first'
                    game.innerHTML = secondPlayerChoices
                }

                let winner = checkGameStatus()
                if (winner === 'first') {
                    result.innerHTML = `${capitalizeFirstLetter(firstPlayerName.value)} wins!`
                    gameActive = false
                }
                else if (winner === 'second') {
                    result.innerHTML = `${capitalizeFirstLetter(secondPlayerName.value)} wins!`
                    gameActive = false
                }
                else if (winner === 'Draw') {
                    result.innerHTML = 'Draw'
                    gameActive = false
                }
            }

        })
    })

})