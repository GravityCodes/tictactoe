
// Create game board

const gameBoardModule = (function() {
        let gameboard = [
                         "","","",
                         "","","",
                         "","",""
                        ];

        const placeToken = (symbol, index) => {
            if (gameboard[index] != "") {
                return false;
            }
            else {
            return gameboard[index] = symbol;
            }
        }

        const clearBoard = () => {
            return gameboard = ["","","","","","","","",""];
        }

        const showBoard = () => gameboard;

        const checkWinPattern = (token) => {
            // Check horizontal
            for(let i = 0; i < 9; i += 3) {

                if (gameboard[i] === token && gameboard[i+1] === token && gameboard[i+2] === token) {
                    return true;
                } else {
                    continue;
                } 
            }
            // Check Vertical
            for (let i = 0; i < 4; i++) {
               if (gameboard[i] === token && gameboard[i+3] == token && gameboard[i+6] == token) {
                return true;
               }
               else {
                continue;
               }
            }
            //Check Diagnol
            for (let i = 0; i < 1; i++) {
                if(gameboard[i] === token && gameboard[i+4] === token && gameboard[i+8] === token) {
                    return true;
                }
                else if(gameboard[i + 2] === token && gameboard[i+4] === token && gameboard[i+6] === token) {
                    return true;
                }
                else {
                    return false;
                }
            } 
        }

        return {showBoard, placeToken, clearBoard, checkWinPattern} 
})();

// player function factory

function createPlayer (name, token) {
    
    let wins = 0;
    let loss = 0;

    const addWin = () => wins++;
    const addLoss = () => loss++;


    return {name, token, addWin, addLoss}

}

//game flow module

const gameController = (function (){
    
    

    const createPlayers = () => {
        
        player1 = createPlayer(prompt("what is player 1's name?"), "X");
        player2 = createPlayer(prompt("what is player 2's name?"), "O");

        return {player1, player2}
    }

    const startGame = () => {
        //Game all turns
        for (let i = 0; i < 5; i++){
            
            // holds players desire spot to place token
            let index;

            // First player turn
            while(!gameBoardModule.placeToken(player1.token, index)){
                index = prompt(`${player1.name}'s turn`);
            }
            //end game if player 1 won
            if (gameBoardModule.checkWinPattern(player1.token)) {
                gameBoardModule.clearBoard();
                player1.addWin();
                player2.addLoss();
                break;
            }
            console.log(gameBoardModule.showBoard());

            //run if max number of turns reached
            if(i === 4){
                gameBoardModule.clearBoard();
                break;}

            //Second player turn
            while(!gameBoardModule.placeToken(player2.token, index)){
                index = prompt(`${player2.name}'s turn`);
            }
            //end game if player 2 won
            if(gameBoardModule.checkWinPattern(player2.token)) {
                gameBoardModule.clearBoard();
                player2.addWin();
                player1.addLoss();
                break;
            }
            console.log(gameBoardModule.showBoard());
        }


    }
    
    const playAgain = () => startGame();

    const restartGame = () => createPlayers();

    return {createPlayers, startGame, playAgain, restartGame}
})();


const displayScreen = (function () {
    
})();
