modal.addEventListener('click', (e) => {
    const modal = document.getElementById('modal')
    const modalDisplay = e.target === modal ? 'none' : ''
    modal.style.display = modalDisplay
    // deploy tictactoe table
    GameBoard.boardCreation()
})
window.addEventListener('click', (e) => {
    console.log(e.target.id)
    GameBoard.emptySlot(e)
})

const playerX = 'X'
const playerO = 'O'
const GameBoard = {
    gameBoardArray: [],
    isPlayerXTurn: true,
    roundNumber: 0,

    boardCreation: function () {
        for (let index = 0; index < 9; index++) {

            const grid = document.getElementById('grid')
            const boardSlot = document.createElement('div')
            boardSlot.setAttribute('id', `slot${index}`)
            boardSlot.classList.add('boardSlot')
            grid.appendChild(boardSlot)
            this.gameBoardArray.push(boardSlot)
        }
    },
    changePlayer: function () {
        this.roundNumber += 0.5
        console.log(this.roundNumber)

        if (this.isPlayerXTurn) {
            this.isPlayerXTurn = false
            return playerX
        }
        else {
            this.isPlayerXTurn = true
            return playerO
        }
    },
    playerMove: function (selectedSlot) {
        const mark = document.createElement('div')
        mark.classList.add('mark')
        mark.innerText = this.changePlayer()
        selectedSlot.appendChild(mark)
        if (this.roundNumber > 2) {
            this.checkWinner()
        }

    },
    emptySlot: function (e) {
        this.gameBoardArray.forEach(element => {
            if (element === e.target) {
                this.playerMove(element)
                return true
            } else return false
        })
    },
    checkWinner: function () {

        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        winConditions.forEach(array => {
            let winnerIsX = 0
            let winnerIsO = 0

            array.forEach(index => {
                const currentSlot = document.getElementById(`slot${index}`)
                if (currentSlot.innerText === playerX) {
                    winnerIsX++
                }
                if (currentSlot.innerText === playerO) {
                    winnerIsO++
                }
                if (winnerIsX === 3) {
                    console.log('winner is X')
                    winnerIsX = 'The winner is X Player'
                    return this.endGameModal(winnerIsX)
                }
                if (winnerIsO === 3) {
                    console.log('winner is O')
                    winnerIsO = 'The winner is O Player'
                    return this.endGameModal(winnerIsO)
                }
            })
            if (this.roundNumber === 4.5) {
                this.endGameModal(winner = 'Draw')
            }
            console.log('pause')
        })
    },
    endGameModal: function (winner) {
        const winnerModalDiv = document.createElement('div')
        winnerModalDiv.classList.add('modal')
        winnerModalDiv.style.flexDirection = 'column'

        const modalText = document.createElement('p')
        modalText.innerText = winner
        winnerModalDiv.appendChild(modalText)

        const playAgainBtn = document.createElement('button')
        playAgainBtn.classList.add('btn')
        playAgainBtn.innerText = 'Play Again?'
        winnerModalDiv.appendChild(playAgainBtn)

        const body = document.querySelector('body')
        body.appendChild(winnerModalDiv)

        playAgainBtn.addEventListener('click', () => {
            winnerModalDiv.style.display = 'none'
            this.gameBoardArray.forEach(element => {
                element.remove()
            })
            this.roundNumber = 0
            this.boardCreation()
        })
    }
}



