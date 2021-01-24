const pstWhite = {
  p: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ],

  n: [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50]
  ],

  b: [
    [-20, -10, -10, -10, -10, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 10, 10, 5, 0, -10],
    [-10, 5, 5, 10, 10, 5, 5, -10],
    [-10, 0, 10, 10, 10, 10, 0, -10],
    [-10, 10, 10, 10, 10, 10, 10, -10],
    [-10, 5, 0, 0, 0, 0, 5, -10],
    [-20, -10, -10, -10, -10, -10, -10, -20]
  ],

  r: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [5, 10, 10, 10, 10, 10, 10, 5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [-5, 0, 0, 0, 0, 0, 0, -5],
    [0, 0, 0, 5, 5, 0, 0, 0]
  ],

  q: [
    [-20, -10, -10, -5, -5, -10, -10, -20],
    [-10, 0, 0, 0, 0, 0, 0, -10],
    [-10, 0, 5, 5, 5, 5, 0, -10],
    [-5, 0, 5, 5, 5, 5, 0, -5],
    [0, 0, 5, 5, 5, 5, 0, -5],
    [-10, 5, 5, 5, 5, 5, 0, -10],
    [-10, 0, 5, 0, 0, 0, 0, -10],
    [-20, -10, -10, -5, -5, -10, -10, -20]
  ],

  k: [
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-30, -40, -40, -50, -50, -40, -40, -30],
    [-20, -30, -30, -40, -40, -30, -30, -20],
    [-10, -20, -20, -20, -20, -20, -20, -10],
    [20, 20, 0, 0, 0, 0, 20, 20],
    [20, 30, 10, 0, 0, 10, 30, 20]
  ]
};

const pstBlack = {
  p: pstWhite['p'].slice().reverse(),
  n: pstWhite['n'].slice().reverse(),
  b: pstWhite['b'].slice().reverse(),
  r: pstWhite['r'].slice().reverse(),
  q: pstWhite['q'].slice().reverse(),
  k: pstWhite['k'].slice().reverse()
};


const getPieceValue = function(board, square) {
  const piece = board.get(square);
  // console.log(piece);
  if (piece === null) {
    return 0;
  }

  const getAbsoluteValue = function(piece) {
    var weights = {
      p: 100,
      n: 280,
      b: 330,
      r: 479,
      q: 929,
      k: 20000
    };

    try {
      return weights[piece.type];
    } catch (error) {
    }

    return 0;
  };


  const getSquareValue = function(piece, square) {
    try {
      // console.log(square);
      const row = parseInt(square.charAt(1)) - 1;
      const column = 'abcdefgh'.indexOf(square.charAt(0));

      const value = piece.color === 'w' ? pstWhite[piece.type][row][column] : pstBlack[piece.type][row][column];

      // console.log(value);
      return value;
    } catch (error) {
      // console.log(error.message);
    }

    return 0;
  };

  const value = getAbsoluteValue(piece) + getSquareValue(piece, square);

  return piece.color === 'w' ? value : -value;
};


const evaluateBoard = function(board) {
  let totalEvaluation = 0;
  board.SQUARES.forEach(square => {
    totalEvaluation += getPieceValue(board, square);
  });

  if (board.in_checkmate()) {
    return board.turn() === 'b' ? totalEvaluation + 100000 : totalEvaluation - 100000;
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

