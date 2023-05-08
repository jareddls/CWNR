import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black'

let currentPlayers = [];

function assignPlayerColor(socket) {
  let playerColor;
  if (currentPlayers.length === 0) {
    playerColor = WHITE_PLAYER;
  } else if (currentPlayers.length === 1) {
    playerColor = BLACK_PLAYER;
  } else {
    socket.emit('message', 'Sorry, game is full!');
    return;
  }
  currentPlayers.push(playerColor);
  socket.emit('colorAssigned', playerColor);
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

  socket.on('joinRoom', (roomCode) => {
    console.log(`${socket.id} is joining room ${roomCode}`);

    socket.join(roomCode);

    io.to(roomCode).emit('roomJoined', { roomCode });

    console.log(io.sockets.adapter.rooms.get(roomCode))
  });

  socket.on('roomJoined', (roomCode) => {
    console.log('Room joined: ' + {roomCode} )
  }) 

  socket.on('move', (move) => {
    // console.log("called?")
    const { from, to, roomCode } = move;
    io.to(roomCode).emit('move', { from, to });
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
