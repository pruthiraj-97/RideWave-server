const {calculateDistance,calculateMidpoint}=require('../utils/distanceCalculation')
const { UserRideService }=require('../service/index')
async function findRidderNear(req,res){
    try {
        const source=req.body.source
        const destination=req.body.destination
        const type=req.query.type
        console.log(source,destination,type)
        const midPoint=calculateMidpoint(source,destination)
        const distance=calculateDistance(midPoint,destination)
        const s1=calculateDistance(source,destination)
        const response=await UserRideService.searchRidder(midPoint,distance,type)
        response.data.distance=s1
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

async function connectRider(req,res){
    try {
        // validation if no rider find near
        const {source,destination,distance,nearRidders}=req.body
        const userId=req.payload.id
        const type=req.query.type
        const channel=req.app.get('rabbitmq_channel')
        const response=await UserRideService.connectRider(channel,nearRidders,source,destination,type,distance,userId)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.send(`${error}`)
    }
}

async function acceptRideFromRider(req,res){
   try {
   const bookingId=req.params.id
   const ridderId=req.payload.id
   const response=await UserRideService.confirmationRequestFromRider(bookingId,ridderId)
   return res.status(response.status).json(response)
   } catch (error) {
     return res.status(500).json({
        status:500,
        data:null,
        err:{
           message:"some think went wrong"+error
        }
     })
   }
}

module.exports={
    findRidderNear,
    connectRider,
    acceptRideFromRider
}