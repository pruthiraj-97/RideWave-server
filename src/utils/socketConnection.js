const express=require('express')
const { Server }=require('socket.io')
const { createServer } = require('node:http');
const { setUserSocketId }=require('../redis/setData')
const app=express()

const server=createServer(app)
const io=new Server(server)
io.on('connection',(socket)=>{
    console.log('connected',socket.id)
    const socketId=socket.id
    const userId=socket.handshake.query.userId
    if(socketId && userId){
        setUserSocketId(socketId,userId)
    }
    socket.on("Test",(msg)=>{
      console.log(msg)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected")
    })
})



module.exports={
    server,
    app,
    io
}