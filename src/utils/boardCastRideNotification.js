const {io}=require('../utils/socketConnection')
const {getSocketId}=require('../redis/getData')
const boardCastnewRide=async (payload,newBooking)=>{
  // working fine
    await Promise.all(payload.map(async (rider) => {
        const socketId = await getSocketId(rider.riderId);
        console.log("socket id ",socketId)
        if(socketId){
          delete newBooking.otp
          io.to(socketId).emit(`newride`,newBooking);
        }
    }));
}

// io not working
function boardcastlocation(payload){
   io.emit('rider_location',payload)
}

// io not working
function trackRideLocation(payload){
    const riderId=payload.riderId
    const userId=payload.userId
    const userSocket=getSocketId(userId)
    const riderSocket=getSocketId(riderId)
    if(userSocket){
      io.to(userSocket).emit(`TrackRide:${riderId}`,payload)
    }
    if(riderSocket){
      io.to(riderSocket).emit(`TrackRide:${userId}`,payload)
    }
}

module.exports={boardCastnewRide,boardcastlocation,trackRideLocation}