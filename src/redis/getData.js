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
            const coordinate = await redis_client.geoPos(`${key_type}`, elem);
            if (coordinate && coordinate[0]) {
                console.log(coordinate[0])
                const payload = {
                    riderId: elem,
                    longitude: parseFloat(coordinate[0].longitude),
                    latitude: parseFloat(coordinate[0].latitude),
                    type,
                };
                return payload;
            }
            return null; // Return null for any rider without valid coordinates
        }
    ));
    return nearRider
}



module.exports={
    getSocketId,
    getRidders
}