
// (FACTORY) game participants 
const player = (playerName) => {
    const getName = () => playerName;

    return {getName};
};

// (MODULE) keeps track of the state of the game, updating the gameArray with changes
const gameBoard = (() => {
    let gameArray = [   '', '', '',
                        '', '', '', 
                        '', '', '',];

    const display = document.querySelector('h2');
    let turn = 0;
    let marker;
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

    const getGameArray = () => gameArray;
    const setGameArray = (newArray) => gameArray = newArray;

    //reset the array to 9 empty strings
    const resetGameArray = () => {
        let i = 0;
        blocks.forEach(element => {
            blocks[i].classList.remove('occupied');
            i++;
        })

        turn = 0;
        gameArray = [ '', '', '', '', '', '', '', '', '',];
        setBlockListeners();
        display.innerText = ''; 
    }

    //add an x or o to the clicked on block
    const addMark = (markLocation) => {
        
        index = markLocation.substring(markLocation.length - 1);
        //return if block has already been clicked on
        if(blocks[index].classList.contains('occupied')){
            return;
        }

        if(turn % 2 == 0 ? marker = 'x' : marker = 'o');
        turn++;
        displayController.incTurn();                
        gameArray = getGameArray();
        gameArray.splice(index, 1, marker);         //add mark to copy of the game array
        blocks[index].classList.add('occupied');

        setGameArray(gameArray);                    //update game array to show new added mark
        displayController.render();                 //renders the array to screen

    };

    //add listeners to each block that calls addMark function
    const blocks = document.querySelectorAll("div[class='block']");
    function setBlockListeners() {
        blocks.forEach(element => {
            element.addEventListener('click', () => addMark(element.id))
        });
    };

    //check to see if any element from winCondition array is present
    const checkPlayerWin = (playerMark) => {
        return winConditions.some(function(threeInARow) {
            return threeInARow.every(function(blockMark) {
                return gameArray[blockMark] === playerMark;
            });
        });
    };

    setBlockListeners();
    return{getGameArray, resetGameArray, checkPlayerWin};

})();


// (MODULE) manipulates the DOM to show the current game state
const displayController = (() => {

    let display = document.querySelector('h2');
    let turn = 0;
    let player1;
    let player2;

    const gameGrid = document.querySelector('div[class="grid"]');
    gameGrid.style.display = 'none';

    const resetTurn = () => turn = 0;
    const incTurn = () => turn++;

    //render the gameArray to the screen
    const render = () => {

        let index = 0;
        gameArray = gameBoard.getGameArray();
        gameArray.forEach(element => {
            let div = document.querySelector(`div[id=block_${index}]`);
            div.innerText = element;
            index++
        });

        //everytime rendered, check if there is a winner
        displayWinner();
    }

    //check for winner or draw and display
    const displayWinner = () => {
       
        if(gameBoard.checkPlayerWin('x')){
            display.innerText = `Congrats ${player1.getName()}!!`;
            return;
        }
        else if(gameBoard.checkPlayerWin('o')){
            display.innerText = `Well done, ${player2.getName()}!`;
            return;
        }
        else if(turn > 8){
            display.innerText = 'its a draw!';
            return;
        };
    };

    //retrieve player names from the user
    const inputPlayerNames = () => {
        const p1 = prompt('enter player 1', 'p1');
        const p2 = prompt('enter player 2', 'p2');

        player1 = player(p1);
        player2 = player(p2);
        return (player1, player2);
    }
    
    const startBtn = document.querySelector('button[id="start"]');
    //when starting game -> get names, hide button, and show game grid
    startBtn.addEventListener('click', () =>{
        inputPlayerNames();
        startBtn.style.display = 'none';
        restartBtn.style.display = 'block';
        gameGrid.style.display = 'grid';
        render();
    });


    const restartBtn = document.querySelector('button[id="restart"]');
    //when restarting game -> reset turn, clear text display, and reset the grid
    restartBtn.addEventListener('click', () =>{
        resetTurn();
        display == '';
        gameBoard.resetGameArray();
        render();
    });

    return{render, incTurn};
})();

