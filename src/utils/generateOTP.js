const otpGenerator=require('otp-generator')

const generateotp=async ()=>{
   const otp=await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
   const rideOtp=parseInt(otp)
   return rideOtp
}

generateotp()

module.exports={
    generateotp
}