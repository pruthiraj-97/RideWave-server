const UserRepository=require('../repository/user')
const bcryptjs=require('bcryptjs')
const JWT=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
class AuthService{
    async signUp(data){
        let isUserExist=await UserRepository.findByEmail(data.email)
        if(isUserExist){
            return {
                status:400,
                data:{},
                error:{
                    message:"email already exist"
                }
            }
        }
        isUserExist=await UserRepository.findByContactNumber(data.contactNumber)
        if(isUserExist){
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
        const newUser=await UserRepository.create(data)
        return {
            status:200,
            data:{
                message:"user created successfully",
                error:null
            }
        }
    }
    async login(data,res){
        let isUserExist=await UserRepository.findByEmail(data.email)
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
        res.cookie('JWT_TOKEN',token,{httpOnly:true})
        return {
            status:200,
            data:{
                message:"user login successfully",
            },
            error:null
        }
    }
}

module.exports=new AuthService()
