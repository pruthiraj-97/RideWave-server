const {calculateDistance,calculateMidpoint}=require('../utils/distanceCalculation')
const { UserRideService }=require('../service/index')
async function findRidderNear(req,res){
    try {
        const source=req.body.source
        const destination=req.body.destination
        const type=req.query.type || 'auto'
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
   console.log(bookingId,ridderId)
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

// it can be done only by rider location update
async function trackRide(req,res){
    try {
        const bookingId=req.params.id
        const {userId,riderId}=req.query
        const {longitude,latitude}=req.body
        const channel=req.app.get('rabbitmq_channel')
        if(!longitude || !latitude||!userId||!riderId||!bookingId){
            return res.status(400).json({
                status:400,
                data:null,
                err:{
                    message:"please provide all credentials"
                }
            })
        }
        const payload={
            longitude:parseFloat(longitude),
            latitude:parseFloat(latitude),
            bookingId,
            userId,
            riderId
        }
       const response=await UserRideService.trackRide(channel,payload)
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

async function startRide(req,res){
     try {
        const bookingId=req.params.id
        let {otp}=req.body
        console.log(otp,bookingId)
        if(!otp){
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message:"Otp not found"
                }

            })
        }
        otp=parseInt(otp)
        const response=await UserRideService.startRide(otp,bookingId)
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

async function completeRide(req,res){
    try {
         const bookingId=req.params.id
         const {longitude,latitude}=req.body
         if(!longitude || !latitude||!bookingId){
             return res.status(400).json({
                 status:400,
                 data:null,
                 err:{
                     message:"please provide all credentials"
                 }
             })
         }
         const payload={
             longitude:parseFloat(longitude),
             latitude:parseFloat(latitude),
             bookingId
         }
         const response=await UserRideService.completeRide(payload)
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

async function gaveReviewToRider(req,res) {
    try {
        const bookingId=req.params.id
        const userId=req.payload.id
        const {rating}=req.body
        if(!rating){
            return res.status(400).json({
                status:400,
                data:null,
                err:{
                    message:"please provide some ratting"
                }
            })
        }

    } catch (error) {
        
    }
}

module.exports={
    findRidderNear,
    connectRider,
    acceptRideFromRider,
    startRide,
    trackRide,
    completeRide,
    gaveReviewToRider
}