import { Link, useHistory } from "react-router-dom";
function Tetris() {
  const history = useHistory();
  //Game pieces
  const pieces = [
    ["▟", "▙", "▛", "▜"],
    ["▘", "▖"],
    ["▚", "▞"],
  ];

  const noCollision = {
    "▟": { "▟": true, "▜": true, "▘": true, "▖": true, "▚": true, "▞": true },
    "▙": { "▟": true, "▙": true, "▛": true, "▖": true, "▞": true },
    "▛": { "▙": true, "▛": true, "▜": true, "▘": true, "▚": true },
    "▜": { "▟": true, "▜": true, "▘": true, "▖": true, "▚": true, "▚": true },
    "▘": { "▙": true, "▛": true, "▜": true, "▘": true, "▚": true },
    "▖": { "▟": true, "▙": true, "▛": true, "▖": true, "▞": true },
    "▚": { "▟": true, "▙": true, "▛": true, "▖": true, "▞": true },
    "▞": { "▙": true, "▛": true, "▜": true, "▘": true, "▚": true },
    "▖▖": { "▙": true, "▛": true, "▟": true, "▞": true, "▖": true },
  };

  const collidesOutcome = {
    "▚": { "▜": "▘", "▘": "▘", "▚": "." },
    "▞": { "▟": "▖", "▖": "▖", "▞": "." },
    "▟": { "▙": "▖▖", "▛": "▖▘" },
    "▙": { "▜": ".", "▘": ".", "▚": "▙" },
    "▛": { "▟": ".", "▖": ".", "▞": "▛" },
    "▜": { "▙": "▘" + "▖", "▛": "▘▘" },
    "▘": { "▟": ".", "▖": ".", "▞": "▘" },
    "▖": { "▜": ".", "▘": ".", "▚": "▖" },
    "▖▖": { "▜": "▖", "▘": "▖", "▚": "▖▖" },
  };

  //Setup
  this.board = new Array(60);
  this.board.fill(".");
  this.board[0] = "▜";
  this.started = false;
  this.currentIndex = this.board.length;
  this.stackIndex = 0;
  this.currentBlock = null;
  this.currentBlockIndex = [];
  this.score = 0;

  this.generateNewBlock = () => {
    //Generate random number between index values of pieces array then push to game board array
    this.currentBlockIndex[0] = randomNumber(-1, 2);
    this.currentBlockIndex[1] = randomNumber(-1, 1);
    this.currentBlock = pieces[[0]][[1]];
    //pieces[this.currentBlockIndex[0]][this.currentBlockIndex[1]];
    this.board.push(this.currentBlock);
  };

  this.rotateBlock = () => {
    //Cycle through the block array
    this.currentBlockIndex[1] =
      ++this.currentBlockIndex[1] % pieces[this.currentBlockIndex[0]].length;

    let newBlock = pieces[this.currentBlockIndex[0]][this.currentBlockIndex[1]];

    //Swap the piece at board index x with the new piece
    this.board[this.currentIndex] = newBlock;
    this.currentBlock = newBlock;
  };
  this.print = () => {
    let board = this.board.join("");
    history.replace(`/tetris/${board}Score:${this.score}`);
  };

  this.run = (tickRate = 80) => {
    setInterval((tickRate) => {
      this.step();
      this.print();
    }, tickRate);
  };

  this.step = () => {
    this.stackIndex == -1 && alert("You won!");
    if (this.started == false) {
      //Board uses periods to avoid URL encoding. The pieces take up about four period spaces and must be removed to keep board length roughly the same same size
      this.board = this.board.slice(0, this.board.length - 4);
      this.currentIndex = this.board.length;
      this.started = true;
      this.generateNewBlock();
      //Check if new piece has reached the stack
    } else if (this.stackIndex + 1 == this.currentIndex) {
      //Debug
      console.log(
        `Stack Index ${this.stackIndex}, Stack Block: ${
          this.board[this.stackIndex]
        }, Current Block: ${this.currentBlock} Current Index: ${
          this.currentIndex
        }`
      );
      //Check if piece 'fits' or whether we need to calculate the outcome of a two blocks colliding
      if (noCollision[this.board[this.stackIndex]][this.currentBlock]) {
        ++this.stackIndex;
        this.started = false;
      } else {
        //Work out the collision outcome of two blocks
        let collisionBlock =
          collidesOutcome[this.board[this.stackIndex]][this.currentBlock];

        this.board[this.stackIndex] = "░";
        this.board[this.currentIndex] = ".";
        this.print();
        sleep(90);
        this.board[this.stackIndex] = collisionBlock;
        this.board[this.currentIndex] = ".";
        this.print();
        collisionBlock == "." && --this.stackIndex;
        //Keep score and set started to false so a new block is generated
        ++this.score;
        this.started = false;
      }
    } else {
      //Swap arr position ie. move block to the left
      this.board[this.currentIndex] = this.board.splice(
        this.currentIndex - 1,
        1,
        this.board[this.currentIndex]
      )[0];
      this.currentIndex = this.currentIndex - 1;
    }
  };

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min + 1;
  }
  //Nasty thread burning into the atmosphere
  function sleep(miliseconds) {
    var e = new Date().getTime() + miliseconds;
    while (new Date().getTime() <= e) {}
  }
}

export default Tetris;
