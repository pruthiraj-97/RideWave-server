const redis_client=require('../config/redis')
const getSocketId=async (userId)=>{
    const socketid=await redis_client.get(userId)
}

module.exports={
    getSocketId
}