namespace Game {

    export enum Mark {
        X = "X",
        O = "O",
        Empty = " "
    }

    export enum Winner {
        X = "PlayerX won the game!",
        O = "PlayerO won the game!",
        Draw = "Draw!",
        NotFinishedYet = "No one won yet"
    }

    var winningStrikes: Array<Array<Number>> = [
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

    export class Board {

        public turn: Mark;
        public cells: Array<Mark>;

        constructor() {
            this.turn = Mark.X;
            this.cells = new Array<Mark>(9);

            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i] = Mark.Empty;
            }
        }

        public clean(): void {
            for (let i = 0; i < this.cells.length; i++) {
                this.cells[i] = Mark.Empty;
            }
        }
        public show(): Array<Mark> {
            return this.cells;
        }
        public newTurn(): void {
            this.turn = (this.turn == Mark.X) ? Mark.O : Mark.X;
        }
        public getMark(index: number): Mark {
            return this.cells[index - 1];
        }
        public markIN(index: number): void {
            if (this.getMark(index) == Mark.Empty) {
                this.cells[index - 1] = this.turn;
                this.newTurn();
            }
        }
        public isFull(): boolean {
            for (let i = 0; i < this.cells.length; i++) {
                if (this.cells[i] == Mark.Empty) {
                    return false;
                }
            }
            return true;
        }
        public check(): Winner {
            let strike;
            for (let i = 0; i < winningStrikes.length; i++) {
                strike = winningStrikes[i];
                if (this.getMark(strike[0]) == Mark.X && this.getMark(strike[1]) == Mark.X && this.getMark(strike[2]) == Mark.X) {
                    return Winner.X;
                } else if (this.getMark(strike[0]) == Mark.O && this.getMark(strike[1]) == Mark.O && this.getMark(strike[2]) == Mark.O) {
                    return Winner.O;
                }
            }
            if (this.isFull()) {
                return Winner.Draw;
            }
            
            return Winner.NotFinishedYet;
        }

    }

}

var htmlCells: Array<HTMLElement> = new Array<HTMLElement>();
var statusHeader: HTMLElement = document.getElementById("status");
var board: Game.Board = new Game.Board();
var fps = 60;

statusHeader.innerHTML = board.check();

for (let i = 0; i < 9; i++) {
    htmlCells[i] = document.getElementById(`${i + 1}`);
}

for (let i in htmlCells) {
    htmlCells[i].addEventListener('click', (e) => {
        // @ts-ignore
        board.markIN(e.target.id);
        if (board.check() != Game.Winner.NotFinishedYet) {
            statusHeader.innerHTML = board.check();
            board.clean();
        } else {
            statusHeader.innerHTML = board.check();
        }
    })
}

setInterval(() => {
    let preview = board.show();
    for (let i in htmlCells) {
        htmlCells[i].innerHTML = preview[i].valueOf();
    }
}, 1000 / fps);