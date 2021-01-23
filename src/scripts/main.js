import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ChessBoardElement, ChessBoard } from 'chessboard-element';
import { Chess } from 'chess.js';

import * as AlphaBeta from './alpha-beta';


import "../styles/main.scss";


const board = document.querySelector('chess-board');
const game = new Chess();

board.addEventListener('drag-start', (e) => {
  const {source, piece, position, orientation} = e.detail;

  // do not pick up pieces if the game is over
  if (game.game_over()) {
    e.preventDefault();
    return;
  }

  // only pick up pieces for White
  if (piece.search(/^b/) !== -1) {
    e.preventDefault();
    return;
  }
});


function makeBestMove(game, board, depth) {
  let bestMove = AlphaBeta.minimaxRoot(game, depth, true);
  game.move(bestMove);
  setTimeout(function() {
    board.setPosition(game.fen());
  }, 100);
}

function makeRandomMove () {
  let possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) {
    return;
  }

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.setPosition(game.fen());
}

board.addEventListener('drop', (e) => {
  const {source, target, setAction} = e.detail;

  // see if the move is legal
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });

  // illegal move
  if (move === null) {
    setAction('snapback');
    return;
  }

  window.setTimeout(function() {
    makeBestMove(game, board, 3);
  }, 250);
});

// update the board position after the piece snap
// for castling, en passant, pawn promotion
board.addEventListener('snap-end', (e) => {
  board.setPosition(game.fen());
});

board.start();
