const { RidderService }=require('../service/index')
async function registerRidder(req,res){
    try {
        const payload={
            username:req.body.username,
            email:req.body.email,
            contactNumber:parseInt(req.body.contactNumber),
            password:req.body.password,
            ridderType
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
        const channel =req.app.get('rabbitmq_channel');
        const response=await RidderService.updateLocation(channel,payload)
        return res.status(response.status).json(response)
    } catch (error) {
        
    }
}

async function activateRidder(req,res){
    try {
        const ridderId=req.params.id
        const response=await RidderService.activateRidder(ridderId)
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
        const response=await RidderService.deactivateRidder(ridderId)
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