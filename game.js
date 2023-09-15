const prompt = require('prompt-sync')({ sigint: true });

class Field {
  constructor(field) {
    this.field = field;
    this.currentRow = 0;
    this.currentCol = 0;
    this.isGameOver = false;
  }

  print() {
    const fieldString = this.field.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === this.currentRow && colIndex === this.currentCol) {
          return pathCharacter;
        }
        return cell;
      }).join('')
    ).join('\n');
    console.log(fieldString);
  }

  playGame() {
    while (!this.isGameOver) {
      this.print();
      this.askForMove();
      if (this.isGameOver) {
        console.log(this.isWin() ? 'Congratulations! You found your hat!' : 'Sorry, you fell into a hole or moved outside the field.');
      }
    }
  }

  askForMove() {
    const move = prompt('Which way? (U/D/L/R): ').toUpperCase();
    switch (move) {
      case 'U':
        this.move(-1, 0);
        break;
      case 'D':
        this.move(1, 0);
        break;
      case 'L':
        this.move(0, -1);
        break;
      case 'R':
        this.move(0, 1);
        break;
      default:
        console.log('Invalid move! Use U/D/L/R for Up/Down/Left/Right.');
        break;
    }
  }

  move(rowOffset, colOffset) {
    const newRow = this.currentRow + rowOffset;
    const newCol = this.currentCol + colOffset;

    if (this.isOutOfBounds(newRow, newCol)) {
      this.isGameOver = true;
      return;
    }

    const newPosition = this.field[newRow][newCol];
    
    if (newPosition === hat) {
      this.isGameOver = true;
      return;
    }

    if (newPosition === hole) {
      this.isGameOver = true;
      return;
    }

    this.field[this.currentRow][this.currentCol] = fieldCharacter; // Reset the current position
    this.currentRow = newRow;
    this.currentCol = newCol;
    this.field[this.currentRow][this.currentCol] = pathCharacter;

    if (this.isWin()) {
      this.isGameOver = true;
      return;
    }
  }

  isOutOfBounds(row, col) {
    return row < 0 || row >= this.field.length || col < 0 || col >= this.field[0].length;
  }

isWin() {
    const adjacentTiles = [
      { row: this.currentRow - 1, col: this.currentCol },
      { row: this.currentRow + 1, col: this.currentCol },
      { row: this.currentRow, col: this.currentCol - 1 },
      { row: this.currentRow, col: this.currentCol + 1 }
    ];

    for (const tile of adjacentTiles) {
      if (
        tile.row >= 0 &&
        tile.row < this.field.length &&
        tile.col >= 0 &&
        tile.col < this.field[0].length &&
        this.field[tile.row][tile.col] === hat
      ) {
        return true;
      }
    }

    return false;
  }

  static generateField(height, width, percentage) {
    // Calculate the total number of tiles
    const totalTiles = height * width;

    // Calculate the number of holes based on the percentage
    const numHoles = Math.floor((percentage / 100) * totalTiles);

    // Create an empty field filled with fieldCharacter
    const field = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => fieldCharacter)
    );

    // Randomly place the hat (^)
    const hatRow = Math.floor(Math.random() * height);
    const hatCol = Math.floor(Math.random() * width);
    field[hatRow][hatCol] = hat;

    // Randomly place holes (O)
    let placedHoles = 0;
    while (placedHoles < numHoles) {
      const row = Math.floor(Math.random() * height);
      const col = Math.floor(Math.random() * width);
      if (field[row][col] === fieldCharacter) {
        field[row][col] = hole;
        placedHoles++;
      }
    }

    // Ensure the starting position is clear
    field[0][0] = pathCharacter;

    return field;
  }
}

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

const myField = new Field(Field.generateField(10, 10, 20)); // 10x10 field with 20% holes

myField.playGame();
