const redis_client=require('../config/redis')
const {boardcastlocation}=require('../utils/boardCastRideNotification')
// getting error
const setAutoLocation=async (type,longitude,latitude,ridderId)=>{
    const data=await redis_client.geoAdd('auto_Location',{
        longitude:longitude,
        latitude: latitude,
        member: ridderId
    })
    
    const payload={
        id:ridderId,
        longitude:longitude,
        latitude:latitude,
        type:type
    }
    boardcastlocation(payload)
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
    boardcastlocation(payload)
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
    boardcastlocation(payload)
}

const setUserSocketId=async (socketId,userId)=>{
    const result=await redis_client.set(userId,socketId)
    console.log(result)
}

const setRidderActivate=async (ridderId)=>{
    const result=await redis_client.sAdd('active_riders',ridderId)
}

const trackRide=async (payload)=>{
    const result=await redis_client.geoAdd(`TrackRide${payload.bookingId}`,{
        longitude:parseFloat(payload.longitude),
        latitude:parseFloat(payload.latitude),
        member:payload.bookingId
    })
}

module.exports={
    setAutoLocation,
    setMotoLocation,
    setCarLocation,
    setUserSocketId,
    setRidderActivate,
    trackRide
}