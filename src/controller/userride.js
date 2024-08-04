const {calculateDistance,calculateMidpoint}=require('../utils/distanceCalculation')
const { UserRideService }=require('../service/index')
async function connectRidder(req,res){
    try {
        const source=req.body.source
        const destination=req.body.destination
        const type=req.query.type
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

module.exports={
    connectRidder
}