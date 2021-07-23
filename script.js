// (MODULE) store gameboard as array inside gameBoard object 
const gameBoard = (() => {
    let gameArray = [   'x', 'o', 'o',
                        'o', 'x', 'x', 
                        'x', 'o', 'x',];

    const getGameArray = () => gameArray;

    const setGameArray = (newArray) => gameArray = newArray;

    return{getGameArray, setGameArray};

})();


// (FACTORY) players to be stored in objects 
const player = (playerName) => {
    const getName = () => playerName;

    return {getName};

};



// (MODULE) manipulates the DOM to show the current game state
const displayController = (() => {

    testDisplay = document.querySelector('h2');

    const render = () => {

        let index = 0;
        gameArray = Array.from(gameBoard.getGameArray());
        gameArray.forEach(element => {

            div = document.querySelector(`div[id=block_${index}]`);
            div.innerText = element;
            index++
        });
    }

    return{render};

})();



//function that allows player to add mark to the board on click
//(cannot add to a spot already taken)
//
//player
//  func addMark -> calls getGameArray adds mark to the array inside gameBoard
//                  then calls setGameArray to 'update' the change
//                  and then renders the array to screen



