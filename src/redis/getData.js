const redis_client=require('../config/redis')
const getSocketId=async (userId)=>{
    const socketid=await redis_client.get(userId)
    return socketid
}

const redisKeyType=(type)=>{
    if(type=='auto') return 'auto_Location'
    if(type=='moto') return 'moto_Location'
    if(type=='go') return 'go_Location'
} 

const getRidders=async (point,distance,type)=>{
    // it should be optimise
     const key_type=redisKeyType(type)
     console.log(key_type,distance,point)
     const Ridders=await redis_client.geoSearch(`${key_type}`,{
        longitude: point.longitude,
        latitude: point.latitude,
       },{
          radius: distance,
          unit: 'km'
       })
       const nearRider = await Promise.all(
        Ridders.map(async (elem) => {
            const isActive=await redis_client.sIsMember('active_riders',elem)
            if(isActive){
            const coordinate = await redis_client.geoPos(`${key_type}`, elem);
            if (coordinate && coordinate[0]) {
                const payload = {
                    riderId: elem,
                    longitude: parseFloat(coordinate[0].longitude),
                    latitude: parseFloat(coordinate[0].latitude),
                    type,
                };
                return payload;
            }
         }
       }
    ));
    return nearRider
}

const isRiderActivate=async (ridderId)=>{
   const isActive=await redis_client.sIsMember('active_riders',ridderId)
   return isActive
}



module.exports={
    getSocketId,
    getRidders,
    isRiderActivate
}