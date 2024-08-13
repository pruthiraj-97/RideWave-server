const JWT=require('jsonwebtoken')
const isUserAuthenticate=async (req,res,next)=>{
    try {
        const token=req.cookies.JWT_TOKEN
        if(!token){
            return res.status(401).json({
                status:401,
                data:null,
                err:{
                    message:"Token not found"
                }
            })
        }
        await JWT.verify(token,process.env.TOKEN_KEY,(err,payload)=>{
            if(err){
                return res.status(401).json({
                    status:401,
                    data:null,
                    err:{
                        message:"Token expired"
                    }
                })
            }
            req.payload=payload
        })
        next()
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            err:{
                message:"some thing went wrong "+error
            }
        })
    }
}

const isRider=(req,res,next)=>{
    try {
        const payload=req.payload
        if(payload.type!="rider"){
            return res.status(403).json({
                status:402,
                data:null,
                err:{
                    message:"you are not a rider"
                }
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:null,
            err:{
                message:"some thing went wrong "+error
            }
        })
    }
}


module.exports={isUserAuthenticate,isRider}