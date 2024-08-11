const {setAutoLocation,
      setMotoLocation,
      setCarLocation,
      setUserSocketId
    }=require('../redis/setData')

const updateLocationRiderInDB=async(type,longitude,latitude,ridderId)=>{
    if(type=='auto'){
        await setAutoLocation(type,longitude,latitude,ridderId)
    }else if(type=='moto'){
        await setMotoLocation(type,longitude,latitude,ridderId)
    }else{
        await setCarLocation(type,longitude,latitude,ridderId)
    }
}




module.exports=updateLocationRiderInDB