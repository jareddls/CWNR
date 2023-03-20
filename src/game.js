import { Chess } from 'chess.js'

const chess = new Chess()

//functions:
    //draggable
    //dropOffBoard
    //position
    //onChange
    //onDragStart
    //onDragMove
    //onDrop
    //onMouseoutSquare
    //onMouseoverSquare
    //onMoveEnd
    //onSnapbackEnd
    //onSnapEnd
    //orientation
    //showNotation
    //sparePieces
    //showErrors
    //pieceTheme
    //appearSpeed
    //moveSpeed
    //snapbackSpeed
    //snapSpeed
    //trashSpeed
var board = Chessboard('myBoard',
{
    draggable: true,
    //any pieces dragged off the board gets put back to its original position before it
    dropOffBoard: 'snapback',
    onDrop: onDrop,
    onDragStart: onDragStart,
    orientation: 'white',
    //'rrrrkrrr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 2'
    position: 'start',
    sparePieces: true,
})

var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')

updateStatus()

function onDrop (source, target) {
    // see if the move is legal
    var move = chess.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
    updateStatus()
  }

function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (chess.isGameOver()) return false
  
    // only pick up pieces for the side to move
    if ((chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
    board.position(chess.fen())
  }

function updateStatus () {
    var status = ''
  
    var moveColor = 'White'
    board.orientation('white')
    if (chess.turn() === 'b') {
      moveColor = 'Black'
      board.orientation('black')
    }
  
    // checkmate?
    if (chess.isCheckmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }
  
    // draw?
    else if (chess.isDraw()) {
      status = 'Game over, drawn position'
    }
  
    // game still on
    else {
      status = moveColor + ' to move'
  
      // check?
      if (chess.isCheck()) {
        status += ', ' + moveColor + ' is in check'
      }
    }
  
    $status.html(status)
    $fen.html(chess.fen())
    $pgn.html(chess.pgn())
  }
// const timer = ms => new Promise(res => setTimeout(res, ms))
//document.getElementById('status').innerHTML = status;
