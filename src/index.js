const express=require('express')
const {server,app}=require('./utils/socketConnection')
const redis_client= require('./config/redis');
const createChannel=require('./config/rabbitMQ')
const connectDB=require('./config/database')
const { consumerForLocationUpdate,consumeForRideConfirmation }=require('./utils/consumer')
const {authRouter,ridderRouter,rideRouter,userRideRouter}=require('./routes/index')
require('dotenv').config()
const PORT=process.env.PORT

app.use(express.json())
app.use('/api/auth/user',authRouter)
app.use('/api/auth/rider',ridderRouter)
app.use('/api/ride',rideRouter)
app.use('/api/userride',userRideRouter)

app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"well come to ridewave server"
    })
})

const initializeRabbitmq=async ()=>{
    try {
        const channel=await createChannel()
        app.set('rabbitmq_channel',channel)
        await consumerForLocationUpdate(channel)
        await consumeForRideConfirmation(channel)
    } catch (error) {
        console.log(error)
    }
}
server.listen(PORT,async ()=>{
    console.log(`server is running on port ${PORT}`)
    await redis_client.connect()
    await initializeRabbitmq()
    await connectDB()
})//exporting io