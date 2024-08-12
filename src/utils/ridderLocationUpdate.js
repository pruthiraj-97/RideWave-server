const {setAutoLocation,
      setMotoLocation,
      setCarLocation,
      setUserSocketId
    }=require('../redis/setData')

const {isRiderActivate}=require('../redis/getData')
const updateLocationRiderInDB=async(type,longitude,latitude,ridderId)=>{
    // update in database if rider is active
    const isActive=await isRiderActivate(ridderId)
    if(!isActive){
        console.log("rider is not active")
        return 
    }
    if(type=='auto'){
        await setAutoLocation(type,longitude,latitude,ridderId)
    }else if(type=='moto'){
        await setMotoLocation(type,longitude,latitude,ridderId)
    }else{
        await setCarLocation(type,longitude,latitude,ridderId)
    }
}




module.exports=updateLocationRiderInDB