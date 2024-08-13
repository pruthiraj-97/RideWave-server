const {calculateDistance,calculateMidpoint}=require('../utils/distanceCalculation')
const { UserRideService }=require('../service/index')
async function findRidderNear(req,res){
    try {
        const source=req.body.source
        const destination=req.body.destination
        const type=req.query.type || 'auto'
        if(!source || !destination){
           return res.status(400).json({
               status:400,
               data:{},
               err:{
                   message:"please provide source and destination"
               }
           })
        }
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
                message:"some thing went wrong "+error
            }
        })
    }
}

async function connectRider(req,res){
    try {
        // * These Data have already send in previous API when searching of Riders *
        const {source,destination,distance,nearRidders}=req.body
        if(!source || !destination || !distance || !nearRidders){
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message:"please provide source,destination,distance and nearRidders"
                }
            })
        }
        const userId=req.payload.id
        const type=req.query.type
        const channel=req.app.get('rabbitmq_channel')
        const response=await UserRideService.connectRider(channel,nearRidders,source,destination,type,distance,userId)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong "+error
            }
        })
    }
}

async function acceptRideFromRider(req,res){
   try {
   const bookingId=req.params.id
   const ridderId=req.payload.id
   if(!bookingId || !ridderId){
      return res.status(400).json({
         status:400,
         data:null,
         err:{
            message:"please provide bookingId and ridderId"
         }
      })
   }
   const response=await UserRideService.confirmationRequestFromRider(bookingId,ridderId)
   return res.status(response.status).json(response)
   } catch (error) {
     return res.status(500).json({
        status:500,
        data:null,
        err:{
           message:"some think went wrong "+error
        }
     })
   }
}

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
                message:"some think went wrong "+error
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
                message:"some think went wrong "+error
            }
        })
     }
}

async function completeRide(req,res){
    try {
         const bookingId=req.params.id
         console.log(bookingId)
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
                message:"some think went wrong "+error
            }
        })
    }
}

async function gaveReviewToRider(req,res) {
    try {
        const bookingId=req.params.id
        const riderId=req.query.riderId
        const {ratting}=req.body
        if(!ratting||!bookingId){
            return res.status(400).json({
                status:400,
                data:null,
                err:{
                    message:"please provide some ratting and bookingId"
                }
            })
        }
        const response=await UserRideService.Ratting(bookingId,riderId,ratting)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"Some think went wrong "+error
            }
        })
    }
}

async function startTrackingTheRide(req,res){
    try {
        const bookingId=req.params.id
        const response=await UserRideService.startTraking(bookingId)
        return res.status(response.status).json(response)
    } catch (error) {
        res.status(500).json({
            status:500,
            data:{},
            error:{
                message :"Some think went wrong "+error
            }
        })
    }
}

module.exports={
    findRidderNear,
    connectRider,
    acceptRideFromRider,
    startRide,
    trackRide,
    completeRide,
    gaveReviewToRider,
    startTrackingTheRide
}