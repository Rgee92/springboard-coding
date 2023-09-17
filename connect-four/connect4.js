/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const header = document.querySelector(".header")
const info = document.querySelector(".info")
const player = document.querySelector(".player-text")
const token = document.querySelector(".token")
const btn = document.querySelector('button')

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

player.classList.add('player-text')
player.innerHTML = `Player ${currPlayer}'s turn`

/** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  const grid = (x, y) => [...Array(x)].map(val => Array(y).fill(null))
  board = grid(WIDTH, HEIGHT)
}

const makeHtmlBoard = () => {
  const htmlBoard = document.getElementById("board")

  const top = document.createElement("tr"); // create TableRow for the top
  top.setAttribute("id", "column-top"); // set ID to column-top
  top.addEventListener("click", handleClick); // add a click event

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x); // set the id to the index of array, one for each column
    top.append(headCell); // append it to the top of the table
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) { // iterate through the board array to create columns
    const row = document.createElement("tr"); // create row in the table
    row.classList.add("row")
    for (let x = 0; x < WIDTH; x++) { // iterate through the board array to create rows
      const cell = document.createElement("td"); //create the table data cell
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row); // append the entire row to the board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
const findSpotForCol = (x) => {
  for (let y = HEIGHT - 1; y > -1; y--) { // Height - 1 = index of col
    if (!board[y][x]) {
      return y
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
const placeInTable = (y, x) => {
  const piece = document.createElement("div")
  piece.classList.add("piece")
  piece.classList.add(`_${currPlayer}`)
  const square = document.getElementById(`${y}-${x}`)
  square.append(piece)
}

/** endGame: announce game end */
const endgame = (msg) => {
  alert(msg);
  player.textContent = `Congratulations! Player ${currPlayer} won!`
  board = null
}

/** handleClick: handle click of column top to play piece */
const handleClick = (evt) => {
  const x = +evt.target.id;

  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  board[y][x] = currPlayer;
  placeInTable(y, x);
  checkForWin() && endgame(`Congratulations! Player ${currPlayer} won!`);

  // check for tie game
  board.every(row => row.every(cell => cell)) && endgame("Tie")

  currPlayer = currPlayer === 1 ? 2 : 1
  currPlayer === 1 ? player.innerHTML = `Player ${currPlayer}'s turn` : player.innerHTML = `Player ${currPlayer}'s turn`
  currPlayer ===1 ?token.style.color = "tomato": token.style.color = "#289ee7"
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
const checkForWin = () => {
  const _win = (cells) => {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  for (let y = 0; y < HEIGHT; y++) { // loops over the columns
    for (let x = 0; x < WIDTH; x++) { // loops over the rows
      // get "check list" of 4 cells (starting here) for each of the different
      // ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // calculates if rows and cols
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // match with horz, vert or diag
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
btn.addEventListener('click', () => {
  window.location.reload()
})

makeBoard();
makeHtmlBoard();
