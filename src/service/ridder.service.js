const RidderRepository=require('../repository/rider')
const bcryptjs=require('bcryptjs')
const JWT=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { producerForLocationUpdate }=require('../utils/producer')
const updateLocationRiderInDB=require('../utils/ridderLocationUpdate')
const removeRidderFromDB=require('../utils/removeRidder')
const { setRidderActivate }=require('../redis/setData')
class RidderService{
     async signUp(data){
         let isRidderExist=await RidderRepository.findByEmail(data.email)
         if(isRidderExist){
            return {
                status:400,
                data:{},
                error:{
                    message:"email already exist"
                }
            }
         }
         isRidderExist=await RidderRepository.findByContactNumber(data.contactNumber)
         if(isRidderExist){
            return {
                status:400,
                data:{},
                error:{
                    message:"contact number already exist"
                }
            }
         }
         const hashPassword=await bcryptjs.hash(data.password,10)
         data.password=hashPassword
         const newUser=await RidderRepository.create(data)
         return {
            status:200,
            data:{
                message:"user created successfully",
                error:null
            }
         }
      }
     async login(data,res){
        let isUserExist=await RidderRepository.findByEmail(data.email)
        if(!isUserExist){
            return {
                status:400,
                data:{},
                error:{
                    message:"email not exist"
                }
            }
        }
        const isPasswordMatch=await bcryptjs.compare(data.password,isUserExist.password)
        if(!isPasswordMatch){
            return {
                status:400,
                data:{},
                error:{
                    message:"password not match"
                }
            }
        }
        const payload={
            id:isUserExist._id,
            email:isUserExist.email,
            username:isUserExist.username
        }
        const token=JWT.sign(payload,process.env.TOKEN_KEY,{expiresIn:'1d'})
        res.cookie('token',token,{
            httpOnly:true
        })
        return {
            status:200,
            data:{
                message:"user login successfully",
            },
            error:null
        }
    }
    async updateLocation(channel,data){
         await producerForLocationUpdate(channel,data)
         return {
            status:200,
            data:{
                message:"location updated successfully",
                error:null
            }
         }
    }
    async activateRidder(data){
        await RidderRepository.activate(data.ridderId)
        await setRidderActivate(data.ridderId)
        await updateLocationRiderInDB(data.type,data.longitude,data.latitude,data.ridderId)
        return {
            status:200,
            data:{
                message:"ridder activated successfully",
            },
            error:null
        }
    }

    async deactivateRidder(data){
        await RidderRepository.deactivate(data.ridderId)
        await removeRidderFromDB(data.type,data.longitude,data.latitude,data.ridderId)
        return {
            status:200,
            data:{
                message:"ridder deactivated successfully",
            },
            error:null
        }
    }
}

module.exports=new RidderService()