const { BookingSchema }=require('../model/index')
class BookingRepository{
    async create(distance,userId,otp,type,source,destination,payment){
         const newBooking=await BookingSchema.create({
            distance,
            userId,
            rideType:type,
            payment,
            otp,
            status:'pending',
            pickUpLocation:{
                type:'Point',
                coordinates:[parseFloat(source.longitude),parseFloat(source.latitude)]
            },
            dropOutLocation:{
                type:'Point',
                coordinates:[parseFloat(destination.longitude),parseFloat(destination.latitude)]
            }
           })
        return newBooking
    }
    async completeRide(rideId){
       const complete=await BookingSchema.updateOne({_id:rideId},{
            $set:{
                status:'completed'
            }
       })
       return complete
    }
    async confirmRide(rideId,ridderId){
       const confirm=await BookingSchema.updateOne({_id:rideId},{
        $set:{
            ridderId:ridderId
        }
       })
       return confirm
    }
    // through this i can compute all the this that is present or not
    async getById(rideId){
       const rideDetails=await BookingSchema.findOne({_id:rideId})
       return rideDetails
    }

    async getConfirmRide(rideId){
        const newRide=await BookingSchema.findOne({_id:rideId})
                                         .populate({
                                            path:'ridderId',
                                            select:['username','contactNumber']
                                         })
        return newRide
    }
    async deleteBooking(id){
        const deleted=await BookingSchema.deleteOne({_id:id})
        return deleted
    }
}

module.exports= new BookingRepository()