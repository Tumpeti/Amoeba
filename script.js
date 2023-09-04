const capitalAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const prompt = require('prompt-sync')();
main();
function main (){

  const boardSize = Number(prompt('Choose a gameboard size! (max size: 26) '));
  const gameData = gameDataAssembler(boardSize);
  console.log(boardGamePrinter(boardSize, gameData));
  placing(gameData,'P', boardSize);
  placing(gameData,'P', boardSize);
}

function placing(gameData, playerChar,boardSize){
  let isValid = false;
  let coordinates = prompt('Place your pawn! (A1 for example) ');
  while (!isValid){
  const coordY = (capitalAlphabet.indexOf(coordinates[0]));
  const coordX = Number(coordinates[1]) - 1;
  if (!gameData[coordY][coordX]){
    gameData[coordY][coordX] = playerChar;
    isValid = true;
  } else {
    console.clear();
    console.log(boardGamePrinter(boardSize, gameData));
    coordinates = prompt('Invalid placement! Place your pawn elsewhere! ');
  }
  console.log(boardGamePrinter(boardSize, gameData));
  }
}

function gameDataAssembler(size){
  const lines = [];
  for (let i = 0; i < size; i++ ){
    const line  = [];
    for (let j = 0; j < size; j++){
      line.push('')
    }
    lines.push(line)
  }
  return lines;
}

function boardGamePrinter(size, gameData){
  console.clear();
  let numberSpacer = `   `
  let charSpacer = ` `
  let scores = `---`
  let whiteSpace = `      `
  if (size > 10){
    numberSpacer = `     `
    charSpacer = `  `
    scores = `-----`
    whiteSpace = `     `
  }
  let boardGame = `\n       `
  for (let i = 0; i < size; i++) {
    boardGame += `${i+1}`;
    if (i < 9){
      boardGame += numberSpacer;
    } else {
      boardGame += `    `
    }
  }
  boardGame +=`\n`
    for (let j = 0; j < size; j++){
      boardGame += `\n${capitalAlphabet[j]}      `
      for (let k = 0; k < size; k++) {
        boardGame += `${(gameData[j][k]) ? (gameData[j][k]) : 'X'}` + charSpacer;
        if (k !== size-1){
          boardGame += `|` + charSpacer;
        }       
      }
      boardGame += `\n` + whiteSpace;
      if (j !== size - 1)
      {
      for(let h = 0; h < size; h++){
      boardGame += scores;
      if (h !== size-1){
        boardGame += `+`
      }
      }
    }
  }
  return boardGame;
}


// const placeSplitted = placeOnBoard.split(''); //A 2
// console.log(placeSplitted);
// let xAxis = placeSplitted[1] - 1;
// let yAxis;
// switch(placeSplitted[0]){
//   case 'A': yAxis = 0;
//     break;
//   case 'B': yAxis = 1;
//     break;
//   case 'C': yAxis = 2;
//     break;
//   default: yAxis = -1;  
    
// }

// console.log(yAxis, xAxis);

const figurePlace = 
[['1',    '2',    '3',    '4'],
['X',     '6',    '7',    '8'],
['X',     'O',   '11',  '12'],
['X',    '14',   'X',  '16']];
// figurePlace[yAxis][xAxis] = 'P';
const gameBoard = `   
      1     2     3

A     ${figurePlace[0][0]}  |  ${figurePlace[0][1]}  |  ${figurePlace[0][2]}
     ----+-----+----
B     ${figurePlace[1][0]}  |  ${figurePlace[1][1]}  |  ${figurePlace[1][2]}
     ----+-----+----
C     ${figurePlace[2][0]}  |  ${figurePlace[2][1]}  |  ${figurePlace[2][2]}

`
console.log(hasWon(3,'X'));

function hasWon(winningNumber, playerChar){
  return horizontalChecking(winningNumber,playerChar) || verticalChecking(winningNumber, playerChar) || leftDiagonalChecking(winningNumber, playerChar) || rightDiagonalChecking(winningNumber,playerChar);
}

function horizontalChecking(winningNumber, playerChar){
  for (let i = 0; i < figurePlace.length; i++) {
    const line = figurePlace [i];
    for (let j = 0; j < line.length; j++) {
      let sameLine = 0;
      const pawn = line[j];
      if (pawn === playerChar){
        sameLine ++;
        for (let k = j + 1; k < line.length; k++){
          if (line[k] !== playerChar){
            break;
          }
          sameLine++;
          if (sameLine === winningNumber) return true;
        }
      }      
    }
  }
  return false;
}

function verticalChecking(winningNumber, playerChar){
  for (let i = 0; i < figurePlace.length; i++) {
    let sameColumn = 0;
    for (let j = 0; j < figurePlace.length; j++) {
      const columnElement = figurePlace[j][i];
      if (columnElement === playerChar){
        sameColumn ++;
        for (let k = j + 1; k < figurePlace.length; k++){
          if ((figurePlace[k][i]) !== playerChar){
            break;
          }
          sameColumn ++;
          if (sameColumn === winningNumber) return true;
        }
      }
    }
  } 
  return false;
}

function leftDiagonalChecking(winningNumber, playerChar){
  for (let h = 0; h < figurePlace[0].length; h++){
   for (let i = 0; i < figurePlace.length; i++){
    let hitCounter = 0;
    for (let j = 0 + h, k = i; k >= 0 && j < figurePlace[k].length; k--, j++){
      //console.log();
      //console.log(`${figurePlace[k][j]} hit counter: ${hitCounter++}`);
      if (figurePlace[k][j] === playerChar){
        hitCounter++;
        if (hitCounter === winningNumber){
          return true;
        }
      } else {
        hitCounter = 0;
      }
    }
   }
  }
  return false;
}

function rightDiagonalChecking (winningNumber, playerChar){
  for (let h = figurePlace[0].length - 1; h >= 0; h--){
    for (let i = 0; i < figurePlace.length; i++){
      let hitCounter = 0;
      for (let j = 0 + h, k = 0 + i; k >= 0 && j >= 0; k--, j-- ){
        // console.log(figurePlace[k][j]);
        if (figurePlace[k][j] === playerChar){
          hitCounter++;
          if (hitCounter === winningNumber){
            return true;
          }
        } else {
            hitCounter = 0;
          }
        
      }
    }
  }
  return false;
}