# Amoeba
const figurePlace = 
[['1',    '2',   '3', 'FZ'],
['4',     '5',   '6', 'KZ'],
['7',     '8',   '9',  'AZ'],
['AV0',  'AV1', 'AV2', 'AV3']];
figurePlace[yAxis][xAxis] = 'P';
const gameBoard = `   
      1     2     3
                    k  j
A     ${figurePlace[0][0]}  |  ${figurePlace[0][1]}  |  ${figurePlace[0][2]}
     ----+-----+----
B     ${figurePlace[1][0]}  |  ${figurePlace[1][1]}  |  ${figurePlace[1][2]}
     ----+-----+----
C     ${figurePlace[2][0]}  |  ${figurePlace[2][1]}  |  ${figurePlace[2][2]}
