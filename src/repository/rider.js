const { RidderSchema }=require('../model/index')
class ridderRepository{
    async create(data){
       const newRidder=await RidderSchema.create(data)
       return newRidder
    }
    async findById(id){
       const isRidderExist=await RidderSchema.findById(id)
       return isRidderExist
    }
    async findByEmail(email){
       const isRidderExist=await RidderSchema.findOne({email})
       return isRidderExist 
    }
    async findByContactNumber(contactNumber){
        const isRidderExist=await RidderSchema.findOne({contactNumber})
        return isRidderExist
    }
    async activate(userId){
       const activateRidder=await RidderSchema.updateOne({_id:userId},{
           $set:{
            isActivate:true
           }
       })
       return activateRidder
    }
    async deactivate(userId){
        const deactivateRidder=await RidderSchema.updateOne({_id:userId},{
            $set:{
             isActivate:false
            }
        })
        return deactivateRidder
    }
    async updateRatting(ratting){
        const result=await RidderSchema.updateOne({_id:ratting.ridderId},{
            $set:{
                ratting:ratting.ratting
            }
        })
        return result
    }

    async updateTotalRides(riderId){
        const result=await RidderSchema.updateMany({_id:riderId},{
           $inc:{
            totalRides:1
           }
        })
        console.log("data",result)
        return result
    }
    async updateRatting(ratting,riderId){
        const Booking=await RidderSchema.findOne({_id:riderId})
        const count=Booking.AverageRatting.count
        const AvgRatting=Booking.AverageRatting.totalRatting
        const newAvgRatting=(AvgRatting*count+ratting)/(count+1)
        const result=await RidderSchema.updateOne({_id:riderId},{
            $set:{
                AverageRatting:{
                    totalRatting:newAvgRatting,
                    count:Booking.AverageRatting.count+1
                }
            }
        })
        return result
    }
}

module.exports=new ridderRepository()