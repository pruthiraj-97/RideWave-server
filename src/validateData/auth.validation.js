const signUpValidate=(email,password,username,contactNumber)=>{
    if(!email || !password || !username || !contactNumber){
         return {
             success:false,
             error:"email , password , username , contactNumber required"
         }
    }
    if(contactNumber.length!=10){
        return {
            success:false,
            error:"contact number should be 10 digit"
        }
    }
    return {
        success:true
    }
}

const loginValidate=(email,password)=>{
    if(!email || !password){
        return {
            success:false,
            error:[
                "email , password required"
            ]
        }
    }
    return {
        success:true
    }
}

module.exports={
    signUpValidate,
    loginValidate
}