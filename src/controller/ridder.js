const { RidderService }=require('../service/index')
const {isRiderActivate}=require('../redis/getData')
async function registerRidder(req,res){
    try {
        const payload={
            username:req.body.username,
            email:req.body.email,
            contactNumber:parseInt(req.body.contactNumber),
            password:req.body.password,
            ridderType:req.body.ridderType
        }
        const response=await RidderService.signUp(payload)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong"+error
            }
        })
    }
}

async function loginRidder(req,res){
     try {
        const {email,password}=req.body
        const response=await RidderService.login({email,password},res)
     return res.status(response.status).json(response)
     } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong"+error
            }
        })
     }
}

async function updateLocation(req,res){
    try {
        const ridderId=req.params.id
        const { type } = req.query;
        const { latitude, longitude } = req.body;
        const payload={
            type:type.toLowerCase(),
            latitude:parseFloat(latitude),
            longitude:parseFloat(longitude),
            ridderId
        }
        const isActive=await isRiderActivate(ridderId)
        if(!isActive){
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message:"ridder is not active"
                }
            })
        }
        const channel =req.app.get('rabbitmq_channel');
        const response=await RidderService.updateLocation(channel,payload)
        return res.status(response.status).json(response)
    } catch (error) {
        
    }
}

async function activateRidder(req,res){
    try {
        const ridderId=req.params.id
        const {longitude,latitude}=req.body
        const type=req.query.type
        const payload={
            longitude:parseFloat(longitude),
            latitude:parseFloat(latitude),
            ridderId,
            type
        }
        const response=await RidderService.activateRidder(payload)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong"+error
            }
        })
    }
}

async function deActivateUser(req,res){
    try {
        const ridderId=req.params.id
        const {longitude,latitude}=req.body
        const type=req.query.type
        const payload={
            longitude:parseFloat(longitude),
            latitude:parseFloat(latitude),
            ridderId,
            type
        }
        const response=await RidderService.deactivateRidder(payload)
        return res.status(response.status).json(response)   
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong"+error
            }
        })
    }
}

module.exports={
    registerRidder,
    loginRidder,
    updateLocation,
    activateRidder,
    deActivateUser
}