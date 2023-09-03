const prompt = require('prompt-sync')();
let placeOnBoard = prompt('Place somewhere on the board!')
while (placeOnBoard.length !== 2){
  placeOnBoard = prompt('Only one number and one character allowed!')
}

const placeSplitted = placeOnBoard.split(''); //A 2
console.log(placeSplitted);
let xAxis = placeSplitted[1] - 1;
let yAxis;
switch(placeSplitted[0]){
  case 'A': yAxis = 0;
    break;
  case 'B': yAxis = 1;
    break;
  case 'C': yAxis = 2;
    break;
  default: yAxis = -1;  
    
}

console.log(yAxis, xAxis);

const figurePlace = 
[['1',    '2',   '3', 'X'],
['4',     '5',   'X', 'X'],
['7',    'X',   'P',  'AZ'],
['0', 'X', 'AV2', 'AV3']];
figurePlace[yAxis][xAxis] = 'P';
const gameBoard = `   
      1     2     3

A     ${figurePlace[0][0]}  |  ${figurePlace[0][1]}  |  ${figurePlace[0][2]}
     ----+-----+----
B     ${figurePlace[1][0]}  |  ${figurePlace[1][1]}  |  ${figurePlace[1][2]}
     ----+-----+----
C     ${figurePlace[2][0]}  |  ${figurePlace[2][1]}  |  ${figurePlace[2][2]}

`
console.clear();
console.log(gameBoard);

function hasWon(winningNumber, playerChar){
  return horizontalChecking(winningNumber,playerChar) || verticalChecking(winningNumber, playerChar);
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

function LeftDiagonalChecking(winningNumber, playerChar){
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

console.log(hasWon(3, 'X'));
console.log(LeftDiagonalChecking(3, 'X'));