class Board {
    ctx;
    ctxNext;
    grid;
    piece;
    next;
    requestId;
    time;

    constructor(ctx,ctxNext,){
        this.ctx = ctx
        this.ctxNext = ctxNext
        this.init()
    }

    init(){
        ctx.canvas.width = COLS * BLOCK_SIZE;
        ctx.canvas.height = ROWS * BLOCK_SIZE;

        //scale gives size of block as 1 to simplify code
        ctx.scale(BLOCK_SIZE, BLOCK_SIZE)
    }

    reset(){
        this.grid = this.getEmpyGrid()
        this.piece = new Piece(this.ctx)
        this.piece.setStartingPosition()
        this.GetNewPiece()
    }

    getNewPiece(){
        this.next = new Piece(this.ctxNext)
        this.ctxNext.clearRect(0,0,this.ctxNext.canvas.with, this.ctxNext.canvas.height);
        this.next.draw()
    }

    draw(){
        this.piece.draw()
        this.drawBoard
    }

    drop(){
        let p = moves[KEY.DOWN](this.piece)
        if (this.valid(p)){
            this.piece.move(p)
        }else {
            this.freeze()
            this.clearLines()
            if(this.piece.y === 0 ){
                //GAME OVER
                return false
            }
            this.piece = this.next
            this.piece.ctx = this.ctx
            this.piece.setStartingPosition()
            this.GetNewPiece
        }
        return true
    }

    clearLines (){
        let lines= 0
        this.grid.forEach((row,y) => {
            if(row.every(value => value > 0)){
                lines++
                this.grid.splice(y,1)
                this.grid.unshift(Array(COLS).fill(0))
            }
        })
        if(lines>0) {
            account.score += this.getLinesClearedPoints(lines)
            account.lines += lines
            if(account.lines >= LINES_PER_LEVEL){
                account.level++
                account.lines -= LINES_PER_LEVEL
                time.level = Level[account.level]
            }
        }

    }

    getEmpyGrid(){
        return Array.from(
            {length: ROWS}, ()=> Array(COLS).fill(0)
        )
    }

    valid(p) {
        return p.shape.every((row,dy)=> {
            return row.every((value,dx) => {
                let x = p.x + dx;
                let y = p.y + dy;
                return (
                    value === 0 ||
                    (this.insideWalls(x) && this.aboveFloor(y)  && this.notOccupied(x,y))
                );
            });
        });
    };

    insideWalls(x) {
        return x >= 0 && x< COLS;
    }

    aboveFloor(y){
        return y <= ROWS;
    }

    notOccupied(x,y){
        return this.grid[y] && this.grid[y][x] === 0;
    }

    rotate(p){
        // Clone with JSON for immutability
        let clone = JSON.parse(JSON.stringify(p));
        // Transpose matrix, p is the Piece.
        for (let y = 0; y < p.shape.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [p.shape[x][y], p.shape[y][x]] = 
            [p.shape[y][x], p.shape[x][y]];
    }
  }
  
        // Reverse the order of the columns.
        p.shape.forEach(row => row.reverse());
        
        return p;
      }

}