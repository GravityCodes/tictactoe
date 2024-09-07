
// Create game board

const gameBoard = (function() {
        let gameboard = [
                         "","","",
                         "","","",
                         "","",""
                        ];

        const placeToken = (symbol, index) => {
            return gameboard[index] = symbol;
        }

        const clearBoard = () => {
            return gameboard = ["","","","","","","","",""];
        }

        const showBoard = () => gameboard;

        return {showBoard, placeToken, clearBoard} 
})();

// player function factory

function createPlayer (name, token) {
    
    let wins, tie, loss = 0;

    const addWin = () => wins++;
    const addLoss = () => loss++;
    const addTie = () => tie++;


    return {name, token, addWin, addLoss, addTie}

}

//game flow module

const gameFlow = (function (){
    
    let index;

    const createPlayers = () => {
        
        player1 = createPlayer(prompt("what is player 1's name?"), "X");
        player2 = createPlayer(prompt("what is player 2's name?"), "O");

        return {player1, player2}
    }

    const startGame = () => {
        for (let i = 0; i < 5; i++){

            index = prompt(`${player1.name}'s turn ${gameBoard.showBoard()}`);
            gameBoard.placeToken(player1.token, index);
            //gameBoard.showBoard();

            if(i === 4){break;}

            index = prompt(`${player2.name}'s turn ${gameBoard.showBoard()}`);
            gameBoard.placeToken(player2.token, index);
            //gameBoard.showBoard();
            
        }
    }
 
    return {createPlayers, startGame}
})();



