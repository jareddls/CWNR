import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const WHITE_PLAYER = 'white'
const BLACK_PLAYER = 'black'

// rest of the code

let currentPlayers = [];

function assignPlayerColor(socket, roomCode) {
  let playerColor = '';

  // remove any old socket objects from currentPlayers array
  currentPlayers = currentPlayers.filter(s => s.socket.id !== socket.id);

  // check if socket is already assigned a color
  const assignedSocket = currentPlayers.find(s => s.socket.id === socket.id);
  if (assignedSocket) {
    socket.color = assignedSocket.color;
    socket.emit('colorAssigned', assignedSocket.color);
    return;
  }

  // assign color to socket
  const whitePlayer = currentPlayers.find(s => s.color === WHITE_PLAYER && s.roomCode === roomCode);
  const blackPlayer = currentPlayers.find(s => s.color === BLACK_PLAYER && s.roomCode === roomCode);

  if (!whitePlayer) {
    playerColor = WHITE_PLAYER;
  } else if (!blackPlayer) {
    playerColor = BLACK_PLAYER;
  } else {
    socket.emit('message', 'Sorry, game is full!');
    return;
  }

  socket.color = playerColor
  socket.emit('colorAssigned', playerColor);
  currentPlayers.push({ socket, color: playerColor, roomCode });
}

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('message', (message) => {
    console.log(message)
  })

  socket.on('joinRoom', (roomCode) => {
    console.log(`${socket.id} is joining room ${roomCode}`);
    assignPlayerColor(socket, roomCode)
    console.log(`${socket.id} is color ${socket.color}`)
    socket.join(roomCode);

    io.to(roomCode).emit('roomJoined', { roomCode });

    console.log(io.sockets.adapter.rooms.get(roomCode))
  });

  socket.on('roomJoined', (roomCode) => {
    console.log('Room joined: ' + { roomCode })
  })

  socket.on('move', (move) => {
    // console.log("called?")
    const { from, to, roomCode } = move;
    io.to(roomCode).emit('move', { from, to });
  });

  socket.on('updateBackrank', (fen) => {
    const { givenFen, roomCode } = fen
    // console.log("called?")
    io.to(roomCode).emit('updateBackrank', { givenFen });
  });

  socket.on('disconnect', () => {
    const index = currentPlayers.indexOf(socket.color);
    if (index !== -1) {
      currentPlayers.splice(index, 1);
    }
    console.log(`Client ${socket.id} disconnected`);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
