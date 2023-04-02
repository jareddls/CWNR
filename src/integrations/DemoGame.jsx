import React, { Component } from "react";
import PropTypes from "prop-types";
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor

import Chessboard from "chessboardjsx";

//chess.js version has to be 0.10.2
//issues arise with code maybe we can fix later
//with updated code to work on newer chess.js
//also updated chessboard.js (not sure if necessary)
class RandomVsRandom extends Component {
  static propTypes = { children: PropTypes.func };

  state = { fen: "start" };

  componentDidMount() {
    this.game = new Chess();
    setTimeout(() => this.makeRandomMove(), 1000);
  }

  componentWillUnmount() {
    window.clearTimeout(this.timer());
  }

  timer = () => window.setTimeout(this.makeRandomMove, 1000);

  makeRandomMove = () => {
    let possibleMoves = this.game.moves();

    // exit if the game is over
    if (
      this.game.game_over() === true ||
      this.game.in_draw() === true ||
      possibleMoves.length === 0
    )
      return;

    let randomIndex = Math.floor(Math.random() * possibleMoves.length);
    this.game.move(possibleMoves[randomIndex]);
    this.setState({ fen: this.game.fen() });

    this.timer();
  };

  render() {
    const { fen } = this.state;
    return this.props.children({ position: fen });
  }
}

/* eslint react/display-name: 0 */
/* eslint react/prop-types: 0 */
export default function RandomVsRandomGame() {
  return (
    <div>
      <RandomVsRandom>
        {({ position }) => (
          <Chessboard
            width={320}
            id="random"
            position={position}
            transitionDuration={300}
            boardStyle={{
              borderRadius: "5px",
              boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
            }}
          />
        )}
      </RandomVsRandom>
    </div>
  );
}
