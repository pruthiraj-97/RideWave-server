const express=require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const redis_client= require('./config/redis');
const createChannel=require('./config/rabbitMQ')
const connectDB=require('./config/database')
require('dotenv').config()
const app=express()
const PORT=process.env.PORT
const server=createServer(app)
const io=new Server(server)

io.on('connection',(socket)=>{
    console.log('user connected')
})

const initializeRabbitmq=async ()=>{
    try {
        const channel=await createChannel()
        app.set('rabbitmq_channel',channel)
    } catch (error) {
        
    }
}
server.listen(PORT,async ()=>{
    console.log(`server is running on port ${PORT}`)
    await redis_client.connect()
    await initializeRabbitmq()
    await connectDB()
})
module.exports=io