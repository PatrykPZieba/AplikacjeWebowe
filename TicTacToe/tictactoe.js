var Game;
(function (Game) {
    var Mark;
    (function (Mark) {
        Mark["X"] = "X";
        Mark["O"] = "O";
        Mark["Empty"] = " ";
    })(Mark = Game.Mark || (Game.Mark = {}));
    var Winner;
    (function (Winner) {
        Winner["X"] = "PlayerX won the game!";
        Winner["O"] = "PlayerO won the game!";
        Winner["Draw"] = "Draw!";
        Winner["NotFinishedYet"] = "No one won yet";
    })(Winner = Game.Winner || (Game.Winner = {}));
    var winningStrikes = [
        //Horizontal
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        //Vertical
        [3, 6, 9],
        [2, 5, 8],
        [1, 4, 7],
        //Cross
        [1, 5, 9],
        [7, 5, 3]
    ];
    var Board = /** @class */ (function () {
        function Board() {
            this.turn = Mark.X;
            this.cells = new Array(9);
            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i] = Mark.Empty;
            }
        }
        Board.prototype.clean = function () {
            for (var i = 0; i < this.cells.length; i++) {
                this.cells[i] = Mark.Empty;
            }
        };
        Board.prototype.show = function () {
            return this.cells;
        };
        Board.prototype.newTurn = function () {
            this.turn = (this.turn == Mark.X) ? Mark.O : Mark.X;
        };
        Board.prototype.getMark = function (index) {
            return this.cells[index - 1];
        };
        Board.prototype.markIN = function (index) {
            if (this.getMark(index) == Mark.Empty) {
                this.cells[index - 1] = this.turn;
                this.newTurn();
            }
        };
        Board.prototype.isFull = function () {
            for (var i = 0; i < this.cells.length; i++) {
                if (this.cells[i] == Mark.Empty) {
                    return false;
                }
            }
            return true;
        };
        Board.prototype.check = function () {
            var strike;
            for (var i = 0; i < winningStrikes.length; i++) {
                strike = winningStrikes[i];
                if (this.getMark(strike[0]) == Mark.X && this.getMark(strike[1]) == Mark.X && this.getMark(strike[2]) == Mark.X) {
                    return Winner.X;
                }
                else if (this.getMark(strike[0]) == Mark.O && this.getMark(strike[1]) == Mark.O && this.getMark(strike[2]) == Mark.O) {
                    return Winner.O;
                }
            }
            if (this.isFull()) {
                return Winner.Draw;
            }
            return Winner.NotFinishedYet;
        };
        return Board;
    }());
    Game.Board = Board;
})(Game || (Game = {}));
var htmlCells = new Array();
var statusHeader = document.getElementById("status");
var board = new Game.Board();
var fps = 60;
statusHeader.innerHTML = board.check();
for (var i = 0; i < 9; i++) {
    htmlCells[i] = document.getElementById("" + (i + 1));
}
for (var i in htmlCells) {
    htmlCells[i].addEventListener('click', function (e) {
        // @ts-ignore
        board.markIN(e.target.id);
        if (board.check() != Game.Winner.NotFinishedYet) {
            statusHeader.innerHTML = board.check();
            board.clean();
        }
        else {
            statusHeader.innerHTML = board.check();
        }
    });
}
setInterval(function () {
    var preview = board.show();
    for (var i in htmlCells) {
        htmlCells[i].innerHTML = preview[i].valueOf();
    }
}, 1000 / fps);
