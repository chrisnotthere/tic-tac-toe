//store gameboard as array inside gameBoard object (module)
const gameBoard = (() => {
    let gameArray = [   'x', 'o', 'o',
                        'o', 'x', 'x', 
                        'x', 'o', 'x',];

    const getGameArray = () => gameArray;

    return{getGameArray};

})();


//players to be stored in objects (factory)
const player = (playerName) => {
    const getName = () => playerName;

    return {getName};

};


//create object to control flow of the game (module)
//manipulates the DOM to show the current game state
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
