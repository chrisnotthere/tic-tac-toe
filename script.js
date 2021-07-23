
// (FACTORY) players to be stored in objects 
const player = (playerName, mark) => {
    const getName = () => playerName;
    const getMark = () => mark;

    //const setName = () => 

    return {getName, getMark};

};

// (MODULE) store gameboard as array inside gameBoard object 
const gameBoard = (() => {
    let gameArray = [   '', '', '',
                        '', '', '', 
                        '', '', '',];

    const p1 = player('p1', 'x');
    const p2 = player('p2', '0');
    let turn = 0;
    let marker;

    const getGameArray = () => gameArray;

    const setGameArray = (newArray) => gameArray = newArray;

    const addMark = (markLocation) => {
        
        index = markLocation.substring(markLocation.length - 1);
        //return if block has already been clicked on
        if(blocks[index].classList.contains('occupied')){
            //alert('already clicked');
            return;
        }

        if(turn % 2 == 0 ? marker = 'x' : marker = 'o');
        turn++;
        gameArray = getGameArray();
        gameArray.splice(index, 1, marker);    //add x mark to game array
        //console.log(blocks[index]);
        blocks[index].classList.add('occupied');
        console.log(gameArray);

        setGameArray(gameArray);            //update game array
        displayController.render();         //renders the array to screen

    };

    const blocks = document.querySelectorAll("div[class='block']");
    blocks.forEach(element => {
        element.addEventListener('click', function (){
            addMark(element.id);
            
            }
        )});


    return{getGameArray, setGameArray, blocks, p1, p2};

})();


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

//build win condition logic
//add start/restart game function, attach to restart button
//allow players to edit names
//
//
//see below for answer
//
// There's actually an "all" function built into javascript already, as long as you're not supporting IE8 or below; it's called every. There's a similar function called some, which returns true if the given predicate is true for any element of the array instead of all of them.

// You can combine every and some to get a rather nice solution:

// var winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];

// function playerWins(playerMark) {
//     return winConditions.some(function(threeInARow) {
//         return threeInARow.every(function(square) {
//             return board[square] === playerMark;
//         });
//     });
// }

// var xWins = playerWins('X');