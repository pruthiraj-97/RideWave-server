const { getRidders }=require('../redis/getData')
const { producerForRideConfirmation }=require('../utils/producer')
const BookingRepository=require('../repository/booking')
const { paymentForRide }=require('../utils/calculatePayment')
const { generateotp }=require('../utils/generateOTP')
const {confirmationRideToUser}=require('../utils/sendConfimRideToUser')
const rider = require('../repository/rider')
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
    async connectRider(channel,nearRidders,source,destination,type,dist,userId) {
        const distance=parseFloat(dist)
        const payment=paymentForRide(type,distance)
        const otp=await generateotp()
        const newBooking=await BookingRepository.create(distance,userId,otp,type,source,destination,payment)
        // done
        await producerForRideConfirmation(channel,nearRidders,newBooking)
        return {
            status:200,
            data:{
                message:"Your request has be send please wait to connect you rider"
            },
            err:null
        }
    }
    async confirmationRequestFromRider(bookingId,ridderId){
        const booking=await BookingRepository.getById(bookingId)
        console.log(booking)
        if(booking.ridderId){
            return {
                status:400,
                data:null,
                err:{
                    message:"Ridder is alreay connected"
                }
            }
        }
        await BookingRepository.confirmRide(booking,ridderId)
        const newRide=await BookingRepository.getConfirmRide(bookingId)
        await confirmationRideToUser(newRide)
        return {
            status:200,
            data:{
                newRide
            },
            err:null
        }
    }
}

module.exports=new UserRideService()
//http://localhost:3005/api/userride/acceptride/66b0fdaa2071aadf9eb0a1b0?ridderId=66af40f8bf4bf4213560af4a