const {setAutoLocation,
      setMotoLocation,
      setCarLocation,
      setUserSocketId
    }=require('../redis/setData')

const updateLocationRiderInDB=async(payload)=>{
    const type=payload.type
    switch (type) {
        case 'auto':
            console.log("auto")
            setAutoLocation(payload)
            break;
        case 'moto':
            setMotoLocation(payload)
            break;
        case 'go':
            setCarLocation(payload)
            break;
        default:
            break;
    }
}

module.exports=updateLocationRiderInDB