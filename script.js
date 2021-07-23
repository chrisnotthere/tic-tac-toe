
// (FACTORY) players to be stored in objects 
    const player = (playerName) => {
    const getName = () => playerName;
    const getMark = () => mark;

    return {getName, getMark};
};

// (MODULE) store gameboard as array inside gameBoard object 
const gameBoard = (() => {
    let gameArray = [   '', '', '',
                        '', '', '', 
                        '', '', '',];

    const display = document.querySelector('h2');
    const p1 = player('p1');
    const p2 = player('p2');
    let turn = 0;
    let marker;
    const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

    const getGameArray = () => gameArray;
    const setGameArray = (newArray) => gameArray = newArray;
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

    const addMark = (markLocation) => {
        
        index = markLocation.substring(markLocation.length - 1);
        //return if block has already been clicked on
        if(blocks[index].classList.contains('occupied')){
            //alert('already clicked');
            return;
        }

        if(turn % 2 == 0 ? marker = 'x' : marker = 'o');
        //console.log(turn);
        turn++;
        displayController.incTurn();            //incerement turn var in displayController module
        gameArray = getGameArray();
        gameArray.splice(index, 1, marker);      //add x mark to game array
        blocks[index].classList.add('occupied');
        console.log(gameArray);

        setGameArray(gameArray);              //update game array
        displayController.render();           //renders the array to screen

    };

    const blocks = document.querySelectorAll("div[class='block']");
    function setBlockListeners() {

        blocks.forEach(element => {
            element.addEventListener('click', () => {
                addMark(element.id);
                
                }
            )
        });
    };

    const checkPlayerWin = (playerMark) => {

        return winConditions.some(function(threeInARow) {
            return threeInARow.every(function(blockMark) {
                return gameArray[blockMark] === playerMark;
            });
        });
    };

    //let winner = checkPlayerWin('x');

    setBlockListeners();

    return{getGameArray, resetGameArray, p1, p2, turn, checkPlayerWin};

})();


// (MODULE) manipulates the DOM to show the current game state
const displayController = (() => {

    //testDisplay = document.querySelector('h2');
    let display = document.querySelector('h2');
    let turn = 0;
    const resetTurn = () => turn = 0;
    const incTurn = () => turn++;

    const render = () => {

        let index = 0;
        gameArray = Array.from(gameBoard.getGameArray());
        gameArray.forEach(element => {

            let div = document.querySelector(`div[id=block_${index}]`);
            div.innerText = element;
            
            index++
        });

        //everytime rendered, check if there is a winner
        displayWinner();
    }

    const displayWinner = () => {
       
        if(gameBoard.checkPlayerWin('x')){
            display.innerText = 'Congrats p1';
            return;
        }
        else if(gameBoard.checkPlayerWin('o')){
            display.innerText = 'well done, p2';
            return;
        }
        else if(turn > 8){
            display.innerText = 'its a draw!';
            console.log('game over');
            return;
        };
    };
    
    const restartBtn = document.querySelector('button[id="restart"]');
    restartBtn.addEventListener('click', () =>{

        resetTurn();
        display == '';
        gameBoard.resetGameArray();
        console.log(gameBoard.getGameArray());
        render();

    });

    return{render, displayWinner, incTurn};

})();

