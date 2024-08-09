const riderRegister=(username,email,password,contactNumber,ridderType)=>{
   if(!username || !email || !password || !contactNumber || !ridderType){
    return {
        success:false,
        error:"username , email , password , contactNumber , ridderType required"
    }
   }
   return {
       success:true
   }
}


const loginRider=(email,password)=>{
    if(!email || !password){
        return {
            success:false,
            error:"email , password required"
        }
    }
    return {
        success:true
    }
}

const isValideUpdateLocation=(latitude,longitude,ridderId,type)=>{
    latitude=parseFloat(latitude)
    longitude=parseFloat(longitude)
    if(!latitude || !longitude){
        return {
            success:false,
            error:"latitude , longitude required"
        }
    }
    if(!ridderId || !type){
        return {
            success:false,
            error:"ridderId , type required"
        }
    }
    return {
        success:true
    }
}

module.exports={
    riderRegister,
    loginRider,
    isValideUpdateLocation
}