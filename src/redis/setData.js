const redis_client=require('../config/redis')
const { io }=require('../utils/socketConnection')
const setAutoLocation=async (type,longitude,latitude,ridderId)=>{
    const data=await redis_client.geoAdd('auto_Location',{
        longitude:longitude,
        latitude: latitude,
        member: ridderId
    })
    console.log(data)
    const payload={
        id:ridderId,
        longitude:longitude,
        latitude:latitude,
        type:type
    }
    io.emit('ridder_Location',payload)
}

const setMotoLocation=async (type,longitude,latitude,ridderId)=>{
    const data=await redis_client.geoAdd('moto_Location',{
        longitude:longitude,
        latitude: latitude,
        member: ridderId
    })
    console.log(data)
    const payload={
        id:ridderId,
        longitude:longitude,
        latitude:latitude,
        type:type
    }
   io.emit('ridder_Location',payload)
} 
const setCarLocation=async (type,longitude,latitude,ridderId)=>{
    const data=await redis_client.geoAdd('go_Location',{
        longitude:longitude,
        latitude: latitude,
        member: ridderId
    })
    console.log(data)
    const payload={
        id:ridderId,
        longitude:longitude,
        latitude:latitude,
        type:type
    }
   io.emit('ridder_Location',payload)
   
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