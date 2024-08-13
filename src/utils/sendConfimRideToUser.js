const { getSocketId }=require('../redis/getData')
const confirmationRideToUser=async (newRide)=>{
   const { getIO } = require('../utils/socketConnection');
   const io = getIO();
     if(!io){
        console.log("io is not initialized")
        return 
     }
   const userId=(newRide.userId).toString()
   const socketId=await getSocketId(userId)
   if(!socketId) return 
   else io.to(socketId).emit("confirmationRideFromRider",newRide)
}

const sendRequestForRideDelay=async (userId)=>{
  const { getIO } = require('../utils/socketConnection');
  const io = getIO();
     if(!io){
      console.log("io is not initialized")
      return 
     }

    const socketId=await getSocketId(userId)
    if(!socketId){
        return
    }
    io.to(socketId).emit(`rideRequestTimeout`,{
        message:"No response from riders please try again later"
    })
}

module.exports={
    confirmationRideToUser,
    sendRequestForRideDelay
}
