const redis_client=require('../config/redis')
const io=require('../index')
const setAutoLocation=async (payload)=>{
    //await redis_client.geoAdd('auto_Location',payload.latitude,payload.longitude,payload.id)
    //io.emit('ridder_Location',payload)
    console.log(payload)
}

const setMotoLocation=async (payload)=>{
    //await redis_client.geoAdd('moto_Location',payload.id,payload.latitude,payload.longitude)
    //io.emit('ridder_Location',payload)
    console.log(payload)
}
const setCarLocation=async (payload)=>{
//    await redis_client.geoAdd('go_Location',payload.id,payload.latitude,payload.longitude)
//    io.emit('ridder_Location',payload)
console.log(payload)
}

const setUserSocketId=async (socketId,userId)=>{
    await redis_client.set(userId,socketId)
    console.log(payload)
}

module.exports={
    setAutoLocation,
    setMotoLocation,
    setCarLocation,
    setUserSocketId
}