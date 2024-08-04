const redis_client=require('../config/redis')
async function removeRidderFromDB(type,longitude,latitude,ridderId){
    if(type=='auto'){
       const res= await redis_client.geoRem('auto_Location',ridderId)
       console.log(res)
    }else if(type=='moto'){
       const res= redis_client.geoRem('moto_Location',ridderId)
       console.log(res)
    }else{
       const res=redis_client.geoRem('go_Location',ridderId)
       console.log(res)
    }
}

module.exports=removeRidderFromDB