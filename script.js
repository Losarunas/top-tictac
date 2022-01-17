const gameBoardBox = document.querySelectorAll('.game-board-box');
const gameUI = document.querySelector('.game');
const startGameUI = document.querySelector('#start-game-form');
const reStartGameUI = document.querySelector('#restart-game');
const messageUI = document.querySelector('.msg');

let play1 = document.querySelector("#player1");
let play2 = document.querySelector("#player2");

let player1, player2, game;


startGameUI.addEventListener("submit", function (e) {
    e.preventDefault();
    gameUI.style.display = "block";
    startGameUI.style.display = "none";

    gameBoardBox.forEach(box => box.innerHTML = "");

    player1 = new Player(play1.value, "X");
    player2 = new Player(play2.value, "O");
    game = new GameBoard()
    messageUI.innerHTML = game.message;
});


reStartGameUI.addEventListener("click", function (e) {
    e.preventDefault();
    gameUI.style.display = "none";
    startGameUI.style.display = "block";
});

function GameBoard() {
    this.winner = '';
    this.message = player1.name + " turn";
    this.gameboard = new Array(9);
    this.turn = player1.mark;
    this.playerNameTurn = player1.name;
}

function Player(name, mark) {
    this.name = name;
    this.mark = mark;
}


GameBoard.prototype.playerTurn = function (id) {
    let idNum = id.replace(/\D/g, '');
    this.gameboard.splice(idNum - 1, 1, this.turn);
    this.checkIfWon();
    if (this.winner === "tie") {
        this.message = `Nobody won, it's a tie!`;
        messageUI.innerHTML = game.message;
        return
    }
    if (this.winner) {
        this.message = `Winner is: ${this.winner}`;
        messageUI.innerHTML = game.message;
        return
    }
    if (this.turn === "X") {
        this.message = player2.name + ' turn';
        this.turn = player2.mark;
        this.playerNameTurn = player2.name;
    } else {
        this.message = player1.name + ' turn';
        this.turn = player1.mark;
        this.playerNameTurn = player1.name;
    }
    messageUI.innerHTML = game.message;
}

GameBoard.prototype.checkIfWon = function () {
    //row check
    if (this.gameboard[0] === this.turn && this.gameboard[1] === this.turn && this.gameboard[2] === this.turn ||
        this.gameboard[3] === this.turn && this.gameboard[4] === this.turn && this.gameboard[5] === this.turn ||
        this.gameboard[6] === this.turn && this.gameboard[7] === this.turn && this.gameboard[8] === this.turn) {
        console.log("Rwinner");
        this.winner = this.playerNameTurn;
    }

    //column check
    if (this.gameboard[0] === this.turn && this.gameboard[3] === this.turn && this.gameboard[6] === this.turn ||
        this.gameboard[1] === this.turn && this.gameboard[4] === this.turn && this.gameboard[7] === this.turn ||
        this.gameboard[2] === this.turn && this.gameboard[5] === this.turn && this.gameboard[8] === this.turn) {
        console.log("Cwinner");
        this.winner = this.playerNameTurn;
    }
    //diagonal check 
    if (this.gameboard[0] === this.turn && this.gameboard[4] === this.turn && this.gameboard[8] === this.turn ||
        this.gameboard[2] === this.turn && this.gameboard[4] === this.turn && this.gameboard[6] === this.turn) {
        console.log("Dwinner");
        this.winner = this.playerNameTurn;
    }
    let isTie = this.gameboard.includes(undefined);
    console.log(this.gameboard);
    console.log(this.gameboard.includes(undefined));
    if (!isTie) {
        this.winner = "tie";
    }
}

gameBoardBox.forEach(box => {
    box.addEventListener('click', (e) => {
        if (box.innerHTML.length == 0 && !game.winner) {
            console.log(game.winner);
            box.innerHTML = game.turn;
            game.playerTurn(e.target.id);
        }
    })
});
