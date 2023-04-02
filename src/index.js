import { Chess } from 'chess.js'

const chess = new Chess()

let fen = ''
var board = Chessboard('myBoard')

const timer = ms => new Promise(res => setTimeout(res, ms))

async function PlayARandomChessGame(){
  while (!chess.isGameOver()) {
    const moves = chess.moves()
    const move = moves[Math.floor(Math.random() * moves.length)]
    chess.move(move)
    fen = chess.fen()
    board.position(fen)
    console.log(fen)
    await timer(1000)
  }
}




PlayARandomChessGame()

//chessboard.js
// NOTE: this example uses the chess.js library:
// https://github.com/jhlywa/chess.js

// var board = Chessboard('myBoard')
// board.position(fen)


// var board = null
// var game = new Chess()
// var $status = $('#status')
// var $fen = $('#fen')
// var $pgn = $('#pgn')

// function onDragStart (source, piece, position, orientation) {
//   // do not pick up pieces if the game is over
//   if (game.game_over()) return false

//   // only pick up pieces for the side to move
//   if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
//       (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
//     return false
//   }
// }

// function onDrop (source, target) {
//   // see if the move is legal
//   var move = game.move({
//     from: source,
//     to: target,
//     promotion: 'q' // NOTE: always promote to a queen for example simplicity
//   })

//   // illegal move
//   if (move === null) return 'snapback'

//   updateStatus()
// }

// // update the board position after the piece snap
// // for castling, en passant, pawn promotion
// function onSnapEnd () {
//   board.position(game.fen())
// }

// function updateStatus () {
//   var status = ''

//   var moveColor = 'White'
//   if (game.turn() === 'b') {
//     moveColor = 'Black'
//   }

//   // checkmate?
//   if (game.in_checkmate()) {
//     status = 'Game over, ' + moveColor + ' is in checkmate.'
//   }

//   // draw?
//   else if (game.in_draw()) {
//     status = 'Game over, drawn position'
//   }

//   // game still on
//   else {
//     status = moveColor + ' to move'

//     // check?
//     if (game.in_check()) {
//       status += ', ' + moveColor + ' is in check'
//     }
//   }

//   $status.html(status)
//   $fen.html(game.fen())
//   $pgn.html(game.pgn())
// }

// var config = {
//   draggable: true,
//   position: 'start',
//   onDragStart: onDragStart,
//   onDrop: onDrop,
//   onSnapEnd: onSnapEnd
// }
// board = Chessboard('myBoard', config)

// updateStatus()