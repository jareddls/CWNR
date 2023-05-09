import React, { Component, useState, useEffect } from "react";
import io from 'socket.io-client';
import PropTypes from "prop-types";
import { Chess } from "chess.js"; 
// import { WHITE_PLAYER, BLACK_PLAYER } from '../../server';

import Chessboard from "chessboardjsx";

const WHITE_PLAYER = 'white'
const BLACK_PLAYER = 'black'

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    currentPlayer: WHITE_PLAYER
  };

  componentDidMount() {
    this.game = new Chess();
    //dont change
    this.socket = io('http://localhost:3000');
    

    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');
    
    this.socket.on('connect', () => {
      console.log(`This player is: ${this.socket.id}`)
      this.socket.emit('joinRoom', roomCode);
    });

    this.socket.on('move', (move) => {
      const { from, to } = move;
      const moveResult = this.game.move({ from, to });
  
      if (moveResult) {
        this.setState({
          fen: this.game.fen(),
          history: this.game.history({ verbose: true }),
          squareStyles: squareStyling({ pieceSquare: "", history: this.game.history({ verbose: true }) })
        });
      }
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket = null;
  }

  updateFen = () => {

    const points = {
      'b': 3,
      'r': 5,
      'q': 9,
      'n': 3,
    };

    let whitePoints = 0
    let blackPoints = 0

    let blackBackrank = prompt("Enter black backrank:")
    const afterBlack = "/pppppppp/8/8/8/8/PPPPPPPP/"
    let whiteBackrank = prompt("Enter white backrank:")
    const afterWhite = " w KQkq - 0 1"

    for (let i = 0; i < blackBackrank.length; i++) {
      const piece = blackBackrank[i].toLowerCase();

      if (piece in points) {
        blackPoints += points[piece];
      }
    }

    for (let i = 0; i < whiteBackrank.length; i++) {
      const piece = whiteBackrank[i].toLowerCase();

      if (piece in points) {
        whitePoints += points[piece];
      }
    }

    console.log("black points: " + blackPoints)
    console.log("white points: " + whitePoints)

    if (blackPoints > 32) {
      blackBackrank = "8"
    }

    if (whitePoints > 32) {
      whiteBackrank = "8"
    }

    let createdFenString = blackBackrank + afterBlack + whiteBackrank + afterWhite

    this.setState({ fen: createdFenString });
    this.game = new Chess(createdFenString);
  }

  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  highlightSquare = (sourceSquare, squaresToHighlight) => {
    const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
      (a, c) => {
        return {
          ...a,
          ...{
            [c]: {
              background:
                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
              borderRadius: "50%"
            }
          },
          ...squareStyling({
            history: this.state.history,
            pieceSquare: this.state.pieceSquare
          })
        };
      },
      {}
    );

    this.setState(({ squareStyles }) => ({
      squareStyles: { ...squareStyles, ...highlightStyles }
    }));
  };

  onDrop = ({ sourceSquare, targetSquare }) => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');

    console.log('current player:', this.state.currentPlayer); // add this line
    console.log('socket color:', this.socket.color); // add this line


    if (this.socket.color !== this.state.currentPlayer) {
      return;
    }
    
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" 
    });

    if (move === null) return;

    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history }),
      currentPlayer: this.state.currentPlayer === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
    }));
 
    // console.log("doing an emit")
    this.socket.emit('move', { from: sourceSquare, to: targetSquare, roomCode });
    this.socket.to(roomCode).emit('move', { from: sourceSquare, to: targetSquare, roomCode });
    
  };

  onMouseOverSquare = square => {
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    if (moves.length === 0) return;

    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };

  onMouseOutSquare = square => this.removeHighlightSquare(square);

  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };

  onSquareClick = square => {
    console.log("yo")
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');
    
    if (this.socket.color !== this.state.currentPlayer) {
      return;
    }

    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" 
    });

    if (move === null) return;

    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: "",
      currentPlayer: this.state.currentPlayer === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
    });

    this.socket.emit('move', { from: this.state.pieceSquare, to: square, roomCode });
    this.socket.to(roomCode).emit('move', { from: this.state.pieceSquare, to: square, roomCode })
  };

  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });

  render() {
    const { fen, dropSquareStyle, squareStyles } = this.state;

    return (
      <>
        <button onClick={this.updateFen}>Update backranks</button>
        {this.props.children({
          squareStyles,
          position: fen,
          onMouseOverSquare: this.onMouseOverSquare,
          onMouseOutSquare: this.onMouseOutSquare,
          onDrop: this.onDrop,
          dropSquareStyle,
          onDragOverSquare: this.onDragOverSquare,
          onSquareClick: this.onSquareClick,
          onSquareRightClick: this.onSquareRightClick
        })}
      </>
    );
  }
}

export default function WithMoveValidation() {
  const urlParams = new URLSearchParams(window.location.search);
  const roomCode = urlParams.get('roomCode');

  return (
    <div>
      <p>Room code: {roomCode}</p>
      <HumanVsHuman>
        {({
          position,
          onDrop,
          onMouseOverSquare,
          onMouseOutSquare,
          squareStyles,
          dropSquareStyle,
          onDragOverSquare,
          onSquareClick,
          onSquareRightClick
        }) => (
          <Chessboard
            id="humanVsHuman"
            width={320}
            position={position}
            onDrop={onDrop}
            onMouseOverSquare={onMouseOverSquare}
            onMouseOutSquare={onMouseOutSquare}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
            squareStyles={squareStyles}
            dropSquareStyle={dropSquareStyle}
            onDragOverSquare={onDragOverSquare}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
          />
        )}
      </HumanVsHuman>
    </div>
  );
}

const squareStyling = ({ pieceSquare, history }) => {
  const sourceSquare = history.length && history[history.length - 1].from;
  const targetSquare = history.length && history[history.length - 1].to;

  return {
    [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    ...(history.length && {
      [sourceSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    }),
    ...(history.length && {
      [targetSquare]: {
        backgroundColor: "rgba(255, 255, 0, 0.4)"
      }
    })
  };
};