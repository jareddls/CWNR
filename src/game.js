import { Chess } from 'chess.js'

const chess = new Chess()

var board = Chessboard('myBoard', {
    draggable: true,
    dropOffBoard: 'snapback',
    onDrop: onDrop,
    onDragStart: onDragStart,
    orientation: 'white',
    position: 'start',
    onSnapEnd: function() {
        board.position(chess.fen());
      }
})

function onDrop(source, target) {
    const move = chess.move({
      from: source,
      to: target,
      promotion: 'q' // always promote to a queen for simplicity
    });
  
    if (move === null) return 'snapback';
  
    //updates it with the fen so that we can see the board update when we drop the piece
    board.position(chess.fen());

    updateStatus();
  }
  
function onDragStart(source, piece, position, orientation) {
    // do not allow to pick up opponent's pieces
    if (chess.turn() === 'w' && piece.search(/^b/) !== -1) {
        return false;
    } else if (chess.turn() === 'b' && piece.search(/^w/) !== -1) {
        return false;
    }
}

function updateStatus() {
    let status = '';

    let moveColor = 'White';
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (game.in_draw()) {
        status = 'Game over, drawn position';
    } else {
        status = moveColor + ' to move';

        if (game.in_check()) {
        status += ', ' + moveColor + ' is in check';
        }
    }

document.getElementById('status').innerHTML = status;
}
// const timer = ms => new Promise(res => setTimeout(res, ms))