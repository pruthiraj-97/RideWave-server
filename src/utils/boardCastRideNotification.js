const {getSocketId}=require('../redis/getData')
const boardCastnewRide=async (payload,newBooking)=>{
  const { getIO } = require('../utils/socketConnection');
  const io = getIO();
     if(!io){
      console.log("io is not initialized")
      return 
     }
   
    await Promise.all(payload.map(async (rider) => {
        const socketId = await getSocketId(rider.riderId);
        console.log("socket id ",socketId)
        if (io && socketId) {
          delete newBooking.otp;
          io.to(socketId).emit(`newride`, newBooking);
      }
    }));
}
function boardcastlocation(payload){
  const { getIO } = require('../utils/socketConnection');
 const io = getIO();

if (!io) {
  console.log("io is not initialized");
} else {

  console.log("socket connected")
  io.emit('rider_location', payload);
}
}

async function trackRideLocation(payload){
  const { getIO } = require('../utils/socketConnection');
  const io = getIO();
  if(!io){
    console.log("io is not initialized")
    return 
  }
    const riderId=payload.riderId
    const userId=payload.userId
    const userSocket=await getSocketId(userId)
    const riderSocket=await getSocketId(riderId)
    if(userSocket){
      console.log("user socket ",userSocket)
      io.to(userSocket).emit(`TrackRide:${payload.bookingId}`,payload)
    }
    if(riderSocket){
      console.log("rider socket ",riderSocket)
      io.to(riderSocket).emit(`TrackRide:${payload.bookingId}`,payload)
    }
}

async function sendRideCompletionMessage(userId){
  const { getIO } = require('../utils/socketConnection');
  const io = getIO();
  if(!io){
    console.log("io is not initialized")
    return 
  }
  const socketId=await getSocketId(userId,bookingId)
  if(socketId){
    io.to(socketId).emit(`RideCompletion:${bookingId}`,{
      message:"Your ride is completed , Thank you"
    })
  }
}

module.exports={boardCastnewRide,boardcastlocation,trackRideLocation,sendRideCompletionMessage}