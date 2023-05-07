import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess() not being a constructor

import Chessboard from "chessboardjsx";

/*

let spendable = 31
let n, b, N, B = 3
let r, R = 5
let q, Q = 9

// var chooseBackrankWhite = prompt("Give me a valid backrank fen string.\n You have 31 points.\nN = 3\nB = 3\nR = 5\nQ = 9\nExample:\n4K3")

//something to think about too:
//make them input the piece they want in what square, so different prompt each time; could make it easier for us unless
//you have a good plan for how you wanna code this, then ignore this block lol
var whiteValue = 32
var blackValue = 32

console.log(whiteValue)

while (whiteValue > 31){
  var chooseBackrankWhite = prompt("Give me a valid backrank fen string.\n You have 31 points.\nN = 3\nB = 3\nR = 5\nQ = 9\nExample:\n4K3")

  whiteValue = 0

  for (let i = 0; i < chooseBackrankWhite.length; ++i) {
    if (chooseBackrankWhite[i] === 'B' || chooseBackrankWhite[i] === 'N') {
      whiteValue += 3
    }
    if (chooseBackrankWhite[i] === 'R') {
      whiteValue += 5
    }
    if (chooseBackrankWhite[i] === 'Q') {
      whiteValue += 9
    }
  }
}

console.log(whiteValue)

var chooseBackrankBlack = prompt("Give me a valid backrank fen string.\n You have 31 points.\nn = 3\nb = 3\nr = 5\nq = 9\nExample:\n4k3")

*/

// let positionString_black = "rnbqkbnr/pppppppp/8/8";
// let positionString_white = "/8/8/PPPPPPPP/RNBQKBNR w - - 0 1"
// const regex = /^[rnbqkpRNBQKP]+/;
// const initialPositions = positionString.match(regex);
// console.log(initialPositions)
// let blackPosition = initialPositions[0];
// let whitePosition = initialPositions[1];

// Modify the black and white initial positions as needed
// blackPosition = "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R";
// whitePosition = "rnbqkbnr/1ppppppp/p7/8/8/7P/PPPPPPP1/RNBQKBNR";

// console.log(blackPosition); // Output: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R"
// console.log(whitePosition); // Output: "rnbqkbnr/1ppppppp/p7/8/8/7P/PPPPPPP1/RNBQKBNR"


//disable castling in backrank battle
//rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1

//chess pieces are worth points
//we'll give the players a point limit
//will be fine with empty spaces (hopefully)



// a class that extends a component is a way to create a reusable component that encapusulates some state and behavior logic
// can define the component's behavior by overriding the base methods of the React.Component class
// can import this into another component or the main aplication file and include it as a JSX element, and can also
// pass the data to the component via props and respond to events using callbacks
class HumanVsHuman extends Component {
  static propTypes = { children: PropTypes.func };
  state = {
    //uses actual fen strings
    fen: "start",
    // square styles for active drop square
    dropSquareStyle: {},
    // custom square styles
    squareStyles: {},
    // square with the currently clicked piece
    pieceSquare: "",
    // currently clicked square
    square: "",
    // array of past game moves, looks like it's a stack, so the last move will be at the top of the history stack
    history: []
  };

  // overrides a base method of the React.Component class, with componentDidMount()
  // pretty much is a good time to fetch data from an API, ig in this case it's getting new game info
  // the idea of componentDidMount is that it's good for any type of setup / initialization
  // examples: fetching data from an API, subscribing to a socket, setting up event listeners
  componentDidMount() {
    this.game = new Chess();
  }

  updateFen = () => {
    // so if rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 is the goal, im gonna try to split up the parts and then concatenate them
    // back together at the end

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

  // keep clicked square style and remove hint squares
  removeHighlightSquare = () => {
    this.setState(({ pieceSquare, history }) => ({
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };

  // show possible moves
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
  
  // when moving a piece, when you drop it, check if the move created is legal
  onDrop = ({ sourceSquare, targetSquare }) => {
    // see if the move is legal
    let move = this.game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return;

    // since the move is legal, update the fen, history, and squareStyles
    this.setState(({ history, pieceSquare }) => ({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      squareStyles: squareStyling({ pieceSquare, history })
    }));
  };
  
  // when the mouse is over a square, get the possible moves for that square
  onMouseOverSquare = square => {
    let moves = this.game.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) return;

    // create an array to hold the squares to highlights, iterate through moves and add those to squaresToHighlight
    let squaresToHighlight = [];
    for (var i = 0; i < moves.length; i++) {
      squaresToHighlight.push(moves[i].to);
    }

    this.highlightSquare(square, squaresToHighlight);
  };
  
  // i guess when the mouse stops hovering a square, remove the highlight
  onMouseOutSquare = square => this.removeHighlightSquare(square);

  // central squares get diff dropSquareStyles
  onDragOverSquare = square => {
    this.setState({
      dropSquareStyle:
        square === "e4" || square === "d4" || square === "e5" || square === "d5"
          ? { backgroundColor: "cornFlowerBlue" }
          : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
    });
  };
  // when you click on a square
  onSquareClick = square => {
    this.setState(({ history }) => ({
      squareStyles: squareStyling({ pieceSquare: square, history }),
      pieceSquare: square
    }));

    // choose a move to play, from square to square
    let move = this.game.move({
      from: this.state.pieceSquare,
      to: square,
      promotion: "q" // always promote to a queen for example simplicity
    });

    // if it's an illegal move, don't allow it
    if (move === null) return;

    // since it's legal, update the fen, update the history
    this.setState({
      fen: this.game.fen(),
      history: this.game.history({ verbose: true }),
      pieceSquare: ""
    });
  };
  
  // when right clicking a square, highlight it to be a color
  onSquareRightClick = square =>
    this.setState({
      squareStyles: { [square]: { backgroundColor: "deepPink" } }
    });
  
  // render is a method of a React component, which takes in a set of properties(props)
  // that include children, fen, dropSquareStyle, and squareStyles
  // the render method returns the result of of calling the 'children' function, essentially creating the chessboard UI
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
  return (
    <div>
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
