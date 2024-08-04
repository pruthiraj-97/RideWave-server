const { getRidders }=require('../redis/getData')
class UserRideService{
    async searchRidder(point,distance,type) {
        const nearRidders=await getRidders(point,distance,type)
        console.log(nearRidders)
        return {
            status:200,
            data:{
                nearRidders
            },
            err:null
        }
    }
}

module.exports=new UserRideService()