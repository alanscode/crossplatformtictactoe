const gameEngine = {
    checkForWinner(cells) {
        let waysToWin = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ]

        let resultText = ''
        waysToWin.forEach(check => {
            let result = cells[check[0]].player + cells[check[1]].player + cells[check[2]].player
            if (result == 'XXX') {
                
                
                resultText = 'X Winner!'
            }
            else if(result == 'OOO'){
                
                resultText = 'O Winner!'
            }
            else if(cells.every(cell=>{return cell.player != ''})){
                
                resultText = 'Tie!'
            }
        });

        return resultText
    }
}

export default gameEngine