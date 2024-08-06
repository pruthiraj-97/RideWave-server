const { getSocketId }=require('../redis/getData')
const { io }=require('../utils/socketConnection')
const boardCastnewRide=async (payload,newBooking)=>{
    await Promise.all(payload.map(async (rider) => {
        const socketId = await getSocketId(rider.riderId);
        // currently not presend when rider will connect or activate socket will store in the redis
        if(socketId){
          io.to(socketId).emit(newBooking);
        }
    }));
}

module.exports=boardCastnewRide