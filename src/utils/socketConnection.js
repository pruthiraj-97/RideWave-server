const express=require('express')
const { Server }=require('socket.io')
const { createServer } = require('node:http');
const app=express()

const server=createServer(app)
const io=new Server(server)
io.on('connection',(socket)=>{
    console.log('user connected',socket)
})

module.exports={
    io,
    server,
    app
}