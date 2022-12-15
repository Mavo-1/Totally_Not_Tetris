class Board {
    reset(){
        this.grid = this.getEmpyBoard()
    }
    getEmpyBoard(){
        return Array.from(
            {length: ROWS}, ()=> Array(COLS).fill(0)
        )
    }
}