const { io }=require('../utils/socketConnection')
const { getSocketId }=require('../redis/getData')
const confirmationRideToUser=async (newRide)=>{
   const userId=(newRide.userId).toString()
   const socketId=await getSocketId(userId)
   console.log("socket id ",socketId)
   if(!socketId) return 
   else io.to(socketId).emit(newRide)
}

module.exports={
    confirmationRideToUser
}
