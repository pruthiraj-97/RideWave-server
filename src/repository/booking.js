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
    async completeRide(bookingId){
       const complete=await BookingSchema.updateOne({_id:bookingId},{
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
    async getById(bookingId){
       const rideDetails=await BookingSchema.findOne({_id:bookingId})
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
    async activateRide(bookingId){
        const result=await BookingSchema.updateOne({_id:bookingId},{
            $set:{
                status:'active'
            }
        })
        return result
    }

    async updateRatting(ratting,bookingId){
        const Booking=await BookingSchema.findOne({_id:bookingId})
        console.log(Booking)
        //const newAvgRatting=(Booking.AverageRatting.totalRatting+ratting)/(Booking.AverageRatting.count+1)
        // const result=await BookingSchema.updateOne({_id:bookingId},{
        //     $set:{
        //         AverageRatting:{
        //             totalRatting:newAvgRatting,
        //             count:Booking.AverageRatting.count+1
        //         }
        //     }
        // })
        // return result
    }
}

module.exports= new BookingRepository()