var demoChess = React.createClass({
    render: function () {
        return (
            <div>
                <link rel="stylesheet"
                    href="https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css"
                    integrity="sha384-q94+BZtLrkL1/ohfjR8c6L+A6qzNH9R2hBLwyoAfu3i/WCvQjzL2RQJ3uNHDISdU"
                    crossOrigin="anonymous"
                />
                <link rel="stylesheet" href="/dist/css/default.css" />
                <title>Demo Chess Game</title>
                <div className="centered">
                    <div id="myBoard" style={{ width: '400px' }} />
                </div>
                <div>
                    <label id="status">Status: </label>
                    <br />
                    <label id="fen">FEN: </label>
                    <br />
                    <label id="pgn">PGN: </label>
                </div>
            </div>
        );
    }
});