const {io}=require('../utils/socketConnection')
const { getSocketId }=require('../redis/getData')
const confirmationRideToUser=async (newRide)=>{
   const userId=(newRide.userId).toString()
   const socketId=await getSocketId(userId)
   console.log("socket id ",socketId)
   if(!socketId) return 
   else io.to(socketId).emit(newRide)
}

const sendRequestForRideDelay=async (userId)=>{
    const socketId=await getSocketId(userId)
    if(!socketId){
        io.to(socketId).emit(`rideRequestTimeout${userId}`,{
            message:"No response from riders please try again later"
        })
    }
}

module.exports={
    confirmationRideToUser,
    sendRequestForRideDelay
}
