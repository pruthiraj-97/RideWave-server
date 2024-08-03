const express=require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const redis_client= require('./config/redis');
const createChannel=require('./config/rabbitMQ')
const connectDB=require('./config/database')
const { consumerForLocationUpdate }=require('./utils/consumer')
const {authRouter,ridderRouter,rideRouter}=require('./routes/index')
require('dotenv').config()
const app=express()
const PORT=process.env.PORT
const server=createServer(app)
const io=new Server(server)

app.use(express.json())
app.use('/api/auth/user',authRouter)
app.use('/api/auth/rider',ridderRouter)
app.use('/api/ride',rideRouter)

app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"well come to ridewave server"
    })
})

io.on('connection',(socket)=>{
    console.log('user connected',socket.id)
})

const initializeRabbitmq=async ()=>{
    try {
        const channel=await createChannel()
        app.set('rabbitmq_channel',channel)
        await consumerForLocationUpdate(channel)
    } catch (error) {
        console.log(error)
    }
}
server.listen(PORT,async ()=>{
    console.log(`server is running on port ${PORT}`)
    await redis_client.connect()
    await initializeRabbitmq()
    await connectDB()
})
module.exports=io