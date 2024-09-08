const GameBoard = (function (){
    let board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    const getBoard = () => board;

    const placeToken = (index, token) => {
        if (board[index] != "") {
            console.log("Token already placed here.");
            return false;
        }
        else {
            board[index] = token;
        }
        
    };

    const clearBoard = () => board = ["", "", "","", "", "","", "", ""];

    const checkForWinner = (token) => {
         // Check horizontal
         for(let i = 0; i < 9; i += 3) {

            if (board[i] === token && board[i+1] === token && board[i+2] === token) {
                return true;
            } else {
                continue;
            } 
        }
        // Check Vertical
        for (let i = 0; i < 4; i++) {
           if (board[i] === token && board[i+3] == token && board[i+6] == token) {
            return true;
           }
           else {
            continue;
           }
        }
        //Check Diagnol
        for (let i = 0; i < 1; i++) {
            if(board[i] === token && board[i+4] === token && board[i+8] === token) {
                return true;
            }
            else if(board[i + 2] === token && board[i+4] === token && board[i+6] === token) {
                return true;
            }
            else {
                return false;
            }
        } 
    }

    return {getBoard, placeToken, clearBoard, checkForWinner}
})();

function CreatePlayer (name, token, id) {
    let wins = 0,
        losses = 0,
        ties = 0
    
    const addWin = () => wins++;
    const addLoss = () => losses++;
    const addTie = () => ties++;

    const getWin = () => wins;
    const getLoss = () => losses;
    const getTie = () => ties;

    return {name, token, addWin, addLoss, addTie, getWin, getLoss, getTie, id}
}

const Players = (function () {
    let players = [];

    let activePlayer;
    let inactivePlayer;

    const addPlayers = (player1Name, player2Name) => {
       let player1 = CreatePlayer(player1Name, "x", 1);
       let player2 = CreatePlayer(player2Name, "o", 2);

        players = [player1, player2];

        activePlayer = players[0];
        inactivePlayer = players[1];
    }

    const getActivePlayer = () => activePlayer;

    const switchActivePlayers = () => {
        inactivePlayer = activePlayer;
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        
    }

    const getInactivePlayer = () => inactivePlayer;

    return{addPlayers, getActivePlayer, switchActivePlayers, getInactivePlayer};

})();

const GameController = (function () {

    const playRound = (cell, activePlayer) => {
        
        if(GameBoard.placeToken(cell,activePlayer.token) != false) {
            
            if(GameBoard.checkForWinner(activePlayer.token)){
                console.log(` ${activePlayer.name} has have won`);
                GameBoard.clearBoard();
                activePlayer.addWin();
                Players.getInactivePlayer().addLoss();
            }
            Players.switchActivePlayers();   
        }
        else {
            return false;
        }
    
    }

    return {playRound}

})();

function ScreenController () {
    const $startScreen = document.querySelector("#Start-Screen"),
        $createPlayerScreen = document.querySelector("#Create-Character-Screen"),
        $addNameForm = document.querySelector("#create-player-form"),
        $playingScreen = document.querySelector("#Playing-Screen"),
        $cells = document.querySelectorAll("td");

    const updateScreen = () => {
        for(let i=0; i < 9; i++) {
            $cells[i].dataset.value = GameBoard.getBoard()[i];
        }
    }

    function goToCreatePlayerScreen (e) {
        if(e.target.id === "Start-Screen-btn") {
            $startScreen.classList.add("disable");
            $createPlayerScreen.classList.remove("disable");

        }
    }
    $startScreen.addEventListener('click', goToCreatePlayerScreen);

    function addPlayersToPlayers (e) {
        e.preventDefault();
        Players.addPlayers(e.srcElement[0].value, e.srcElement[1].value);
        $createPlayerScreen.classList.add("disable");
        $playingScreen.classList.remove("disable");
    }
    $addNameForm.addEventListener("submit", addPlayersToPlayers);

    function changeTurn () {
        $cells.forEach((cell) => {
            cell.dataset.playerTurn = `player${Players.getActivePlayer().id}`;
        })
    }
    function addTokenToScreen (cell) {
        //cell.dataset.value = Players.getActivePlayer().token;
        
        GameController.playRound(cell.dataset.index, Players.getActivePlayer());
        changeTurn();
        updateScreen();
    }

    $cells.forEach((cell) => {
        cell.addEventListener('click', () => addTokenToScreen(cell));
    })


}


ScreenController();