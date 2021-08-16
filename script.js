/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */

// (FACTORY) game participants
const player = (playerName) => {
  const getName = () => playerName;

  return { getName };
};

// (MODULE) keeps track of the state of the game, updating the gameArray with changes
const gameBoard = (() => {
  let gameArray = ['', '', '',
    '', '', '',
    '', '', ''];

  const display = document.querySelector('h2');
  let turn = 0;
  let marker;
  const winConditions = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]];

  const getGameArray = () => gameArray;
  const setGameArray = (newArray) => {
    gameArray = newArray;
  };

  const blocks = document.querySelectorAll("div[class='block']");

  // add an x or o to the clicked on block
  const addMark = (markLocation) => {
    const index = markLocation.substring(markLocation.length - 1);
    // return if block has already been clicked on
    if (blocks[index].classList.contains('occupied')) {
      return;
    }

    // eslint-disable-next-line no-cond-assign
    if (turn % 2 === 0 ? marker = 'x' : marker = 'o');
    turn += 1;
    displayController.incTurn();
    gameArray = getGameArray();
    // add mark to copy of the game array
    gameArray.splice(index, 1, marker);
    blocks[index].classList.add('occupied');

    // update game array to show new added mark
    setGameArray(gameArray);
    // renders the array to screen
    displayController.render();
  };

  // add listeners to each block that calls addMark function
  function setBlockListeners() {
    blocks.forEach((element) => {
      element.addEventListener('click', () => addMark(element.id));
    });
  }

  // reset the array to 9 empty strings
  const resetGameArray = () => {
    let i = 0;
    blocks.forEach(() => {
      blocks[i].classList.remove('occupied');
      i += 1;
    });

    turn = 0;
    gameArray = ['', '', '', '', '', '', '', '', ''];
    setBlockListeners();
    display.innerText = '';
  };

  // check to see if any element from winCondition array is present
  const checkPlayerWin = (playerMark) => winConditions
    .some((threeInARow) => threeInARow
      .every((blockMark) => gameArray[blockMark] === playerMark));

  setBlockListeners();
  return { getGameArray, resetGameArray, checkPlayerWin };
})();

// (MODULE) manipulates the DOM to show the current game state
const displayController = (() => {
  const display = document.querySelector('h2');
  let turn = 0;
  let player1;
  let player2;

  const gameGrid = document.querySelector('div[class="grid"]');
  gameGrid.style.display = 'none';

  const resetTurn = () => { turn = 0; };
  const incTurn = () => { turn += 1; };

  // render the gameArray to the screen
  const render = () => {
    let index = 0;
    const gameArray = gameBoard.getGameArray();
    gameArray.forEach((element) => {
      const div = document.querySelector(`div[id=block_${index}]`);
      div.innerText = element;
      index += 1;
    });

    // everytime rendered, check if there is a winner
    displayWinner();
  };

  // check for winner or draw and display
  const displayWinner = () => {
    if (gameBoard.checkPlayerWin('x')) {
      display.innerText = `Congrats ${player1.getName()}!!`;
      return;
    }
    if (gameBoard.checkPlayerWin('o')) {
      display.innerText = `Well done, ${player2.getName()}!`;
      return;
    }
    if (turn > 8) {
      display.innerText = 'its a draw!';
    }
  };

  // retrieve player names from the user
  const inputPlayerNames = () => {
    const p1 = prompt('enter player 1', 'p1');
    const p2 = prompt('enter player 2', 'p2');

    player1 = player(p1);
    player2 = player(p2);
    return (player1, player2);
  };

  const startBtn = document.querySelector('button[id="start"]');
  // when starting game -> get names, hide button, and show game grid
  startBtn.addEventListener('click', () => {
    inputPlayerNames();
    startBtn.style.display = 'none';
    restartBtn.style.display = 'block';
    gameGrid.style.display = 'grid';
    render();
  });

  const restartBtn = document.querySelector('button[id="restart"]');
  // when restarting game -> reset turn, clear text display, and reset the grid
  restartBtn.addEventListener('click', () => {
    resetTurn();
    display.innerText = '';
    gameBoard.resetGameArray();
    render();
  });

  return { render, incTurn };
})();
