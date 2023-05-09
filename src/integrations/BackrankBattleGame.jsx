import React, { Component, useState, useEffect } from "react";
import io from 'socket.io-client';
import PropTypes from "prop-types";
import { Chess } from "chess.js";
import Button from '../components/Button'
// import { WHITE_PLAYER, BLACK_PLAYER } from '../../server';

import Chessboard from "chessboardjsx";

// const WHITE_PLAYER = 'white'
// const BLACK_PLAYER = 'black'
// let playerColor = '';

class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    fen: "start",
    dropSquareStyle: {},
    squareStyles: {},
    pieceSquare: "",
    square: "",
    history: [],
    // currentPlayer: WHITE_PLAYER
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

    //important dont touch
    this.socket.on('move', (move) => {
      console.log('move is happening')
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

    this.socket.on('updateBackrank', ( {givenFen} ) => {
      // const { dFen } = givenFen
      console.log(givenFen)
      console.log(this.game.fen())
      this.setState({
        fen: givenFen,
        history: this.game.history({ verbose: true }),
        squareStyles: squareStyling({ pieceSquare: "", history: this.game.history({ verbose: true }) })
      });

      this.game.load(givenFen);
      console.log(this.game.fen())
    })
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket = null;
  }

  updateFen = () => {
    console.log("called updateFen")
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');

    const points = {
      'b': 3,
      'r': 5,
      'q': 9,
      'n': 3,
      'k': 0
    };

    let whitePoints = 0
    let blackPoints = 0

    let blackBackrank = ""
    let whiteBackrank = ""
    
    let blackSum = 0
    let whiteSum = 0

    while (blackBackrank.length > 8 || !blackBackrank.toLowerCase().includes('k') || blackPoints > 32 || blackSum != 8) {
      blackSum = 0

      blackBackrank = prompt("Enter black backrank:")
      blackPoints = 0
  
      for (let i = 0; i < blackBackrank.length; i++) {
        const piece = blackBackrank[i].toLowerCase();
  
        if (piece in points) {
          blackPoints += points[piece];
        } else if (piece.match(/^(?![brqnk])[a-z]$/i)){
          blackPoints = 1000;
          break;
        }

        if (!isNaN(piece)) {
          blackSum += parseInt(piece)
        }
        else {
          blackSum++
        }
      }
  
      console.log("black points: " + blackPoints)
    }

    while (whiteBackrank.length > 8 || !whiteBackrank.toLowerCase().includes('k') || whitePoints > 32 || whiteSum != 8) {
      whiteSum = 0

      whiteBackrank = prompt("Enter white backrank:")
      whitePoints = 0
  
      for (let i = 0; i < whiteBackrank.length; i++) {
        const piece = whiteBackrank[i].toLowerCase();
  
        if (piece in points) {
          whitePoints += points[piece];
        } else if (piece.match(/^(?![brqnk])[a-z]$/i)){
          whitePoints = 1000;
          break;
        }

        if (!isNaN(piece)) {
          whiteSum += parseInt(piece)
        }
        else {
          whiteSum++
        }
      }
  
      console.log("white points: " + whitePoints)
    }

    const afterBlack = "/pppppppp/8/8/8/8/PPPPPPPP/"
    const afterWhite = " w KQkq - 0 1"

    let createdFenString = blackBackrank.toLowerCase() + afterBlack + whiteBackrank.toUpperCase() + afterWhite
  

    this.setState({ fen: createdFenString });
    this.game = new Chess(createdFenString);

    // console.log(createdFenString)
    this.socket.emit('updateBackrank', {givenFen: createdFenString, roomCode});
    
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
    }));

    // console.log("doing an emit")
    this.socket.emit('move', { from: sourceSquare, to: targetSquare, roomCode });
    // this.socket.to(roomCode).emit('move', { from: sourceSquare, to: targetSquare, roomCode });

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
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('roomCode');


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
      // currentPlayer: this.state.currentPlayer === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
    });

    this.socket.emit('move', { from: this.state.pieceSquare, to: square, roomCode });
    // this.socket.to(roomCode).emit('move', { from: this.state.pieceSquare, to: square, roomCode })
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

  const [orientation, setOrientation] = useState('white')

  const handleOrientation = (event) => {
    setOrientation(orientation === 'white' ? 'black' : 'white');
  };

  return (
    <div>
      <Button text = "Flip Board" onClick={handleOrientation}/>
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
            orientation={orientation}
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