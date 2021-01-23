
const pawnSquareTableVals = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

const pawnSquareTableValsBlack = pawnSquareTableVals.slice().reverse();

const knightSquareTableVals = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50]
];

const knightSquareTableValsBlack = knightSquareTableVals.slice().reverse();

const bishopSquareTableVals = [
  [-20, -10, -10, -10, -10, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 10, 10, 5, 0, -10],
  [-10, 5, 5, 10, 10, 5, 5, -10],
  [-10, 0, 10, 10, 10, 10, 0, -10],
  [-10, 10, 10, 10, 10, 10, 10, -10],
  [-10, 5, 0, 0, 0, 0, 5, -10],
  [-20, -10, -10, -10, -10, -10, -10, -20]
];

const bishopSquareTableValsBlack = bishopSquareTableVals.slice().reverse();

const rookSquareTableVals = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [5, 10, 10, 10, 10, 10, 10, 5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [-5, 0, 0, 0, 0, 0, 0, -5],
  [0, 0, 0, 5, 5, 0, 0, 0]
];

const rookSquareTableValsBlack = rookSquareTableVals.slice().reverse();

const queenSquareTableVals = [
  [-20, -10, -10, -5, -5, -10, -10, -20],
  [-10, 0, 0, 0, 0, 0, 0, -10],
  [-10, 0, 5, 5, 5, 5, 0, -10],
  [-5, 0, 5, 5, 5, 5, 0, -5],
  [0, 0, 5, 5, 5, 5, 0, -5],
  [-10, 5, 5, 5, 5, 5, 0, -10],
  [-10, 0, 5, 0, 0, 0, 0, -10],
  [-20, -10, -10, -5, -5, -10, -10, -20]
];

const queenSquareTableValsBlack = queenSquareTableVals.slice().reverse();

const kingSquareTableVals = [
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-30, -40, -40, -50, -50, -40, -40, -30],
  [-20, -30, -30, -40, -40, -30, -30, -20],
  [-10, -20, -20, -20, -20, -20, -20, -10],
  [20, 20, 0, 0, 0, 0, 20, 20],
  [20, 30, 10, 0, 0, 10, 30, 20]
];

const kingSquareTableValsBlack = kingSquareTableVals.slice().reverse();



const getPieceValue = function(piece, square) {
  if (piece === null) {
    return 0;
  }
  const getAbsoluteValue = function(piece) {
    let value;

    if (piece.type === "p") {
      value = 100;
    } else if (piece.type === "r") {
      value = 500;
    } else if (piece.type === "n") {
      value = 320;
    } else if (piece.type === "b") {
      value = 330;
    } else if (piece.type === "q") {
      value = 900;
    } else if (piece.type === "k") {
      value = 20000;
    }

    return value;
  };

  const getSquareValue = function(piece, square) {
    if (piece.color === "w") {
      if (piece.type === "p") {
        let val = pawnSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "r") {
        let val = rookSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "n") {
        let val = knightSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "b") {
        let val = bishopSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "q") {
        let val = queenSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      } else if (piece.type === "k") {
        let val = kingSquareTable.find(obj => obj.square.name === square);
        return val.wValue;
      }
    } else {
      if (piece.type === "p") {
        let val = pawnSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "r") {
        let val = rookSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "n") {
        let val = knightSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "b") {
        let val = bishopSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "q") {
        let val = queenSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      } else if (piece.type === "k") {
        let val = kingSquareTable.find(obj => obj.square.name === square);
        return val.bValue;
      }
    }
  };

  let value = getAbsoluteValue(piece) + getSquareValue(piece, square);

  if (piece.color === "w") {
    return value;
  } else {
    return -value;
  }
};



const evaluateBoard = function(board) {
  let totalEvaluation = 0;
  board.SQUARES.forEach(square => {
    totalEvaluation += getPieceValue(board.get(square), square);
  });

  if (board.in_checkmate() && board.turn() === "b") {
    return totalEvaluation + 100000;
  } else if (board.in_checkmate() && board.turn() === "w") {
    return totalEvaluation - 100000;
  }
  return totalEvaluation;
};


export const minimaxRoot = function(game, depth, maximisingPlayer) {
  var bestMove = -Infinity;
  var bestMoveFound;

  for (var i = 0; i < game.moves().length; i++) {
    game.move(game.moves()[i]);
    var value = minimax(
      game,
      depth - 1,
      -Infinity,
      Infinity,
      !maximisingPlayer
    );
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      bestMoveFound = game.moves()[i];
    }
  }
  return bestMoveFound;
};


export function minimax(game, depth, alpha, beta, maximisingPlayer) {
  if (depth === 0) {
    return -evaluateBoard(game);
  }
  if (maximisingPlayer) {
    let value = -Infinity;
    for (let i = 0; i < game.moves().length; i++) {
      game.move(game.moves()[i]);
      value = Math.max(value, minimax(game, depth - 1, alpha, beta, false));
      game.undo();
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        return value;
      }
    }

    return value;
  } else {
    let value = Infinity;
    for (let i = 0; i < game.moves().length; i++) {
      game.move(game.moves()[i]);
      value = Math.min(value, minimax(game, depth - 1, alpha, beta, true));
      game.undo();
      beta = Math.min(beta, value);
      if (alpha >= beta) {
        return value;
      }
    }
    return value;
  }
}
