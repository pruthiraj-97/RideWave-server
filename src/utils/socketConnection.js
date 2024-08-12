const express=require('express')
const { Server }=require('socket.io')
const { setUserSocketId ,removeSocket}=require('../redis/setData')
const { createServer } = require('node:http');
const app=express()
const server=createServer(app)
let io;
function initializeSocket() {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('connected', socket.id);
    const socketId = socket.id;
    const userId = socket.handshake.query.userId;

    if (socketId && userId) {
      setUserSocketId(socketId, userId);
    }

    socket.on('Test', (msg) => {
      console.log(msg);
    });

    socket.on('disconnect', async () => {
      const result=await removeSocket(userId)
      console.log("Disconnected ",result)
    });
  });
  return io;
}
initializeSocket()

function getIO() {
    if (!io) {
      return null
    }
    return io;
  }

module.exports = { initializeSocket, getIO,server,app};



