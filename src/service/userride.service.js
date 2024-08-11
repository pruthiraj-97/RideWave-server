const { getRidders }=require('../redis/getData')
const { producerForRideConfirmation,producerForRideTracking }=require('../utils/producer')
const BookingRepository=require('../repository/booking')
const { paymentForRide , wholePayment}=require('../utils/calculatePayment')
const { generateotp }=require('../utils/generateOTP')
const {confirmationRideToUser}=require('../utils/sendConfimRideToUser')
const {calculateDistance}=require('../utils/distanceCalculation')
const {sendRideCompletionMessage}=require('../utils/boardCastRideNotification')
const RidderRepository = require('../repository/rider')
const rider = require('../repository/rider')
const { login } = require('./auth.service')
class UserRideService{
    async searchRidder(point,distance,type) {
        const nearRidders=await getRidders(point,distance,type)
        console.log(nearRidders)
        const cost=wholePayment(distance)
        return {
            status:200,
            data:{
                nearRidders,
                cost:cost
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

    async startRide(otp,bookingId){
        const booking=await BookingRepository.getById(bookingId)
        console.log(booking)
        if(booking.otp!=otp){
            return {
                status:400,
                data:{},
                err:{
                    message:"OTP not match try again"
                }
            }
        }
        await  BookingRepository.activateRide(bookingId)
        return {
            status:200,
            data:{
                message:"Ride started"
            },
            err:{}
        }
    }

    async trackRide(channel,payload){
        await producerForRideTracking(channel,payload)
        return {
            status:200,
            data:{
                message:"Track succesfully"
            },
            err:null
        }
    }

    async completeRide(payload){
        const booking=await BookingRepository.getById(payload.bookingId)
        let distance=calculateDistance(booking.dropOutLocation,{
            longitude:parseFloat(payload.longitude),
            latitude:parseFloat(payload.latitude)
        })
        // in kn
        distance=distance*1000 // in meter
        if(distance>20){
            return {
                status:400,
                data:null,
                err:{
                    message:"Ride is not completed, please drop user at right location",
                    distance:`distancemeter:${distance}`
                }
            }
        }
        await BookingRepository.completeRide(payload.bookingId)
        // send real time notification for further ratting the rider
        await RidderRepository.updateTotalRides(booking.ridderId)
        await sendRideCompletionMessage(booking.userId,payload.bookingId)
        return {
            status:200,
            data:{
                message:"Ride completed succesfully"
            },
            err:null
        }
    }

    async rattingToRide(payload){
        const booking=await BookingRepository.getById(payload.bookingId)
        if(booking.status!='completed'){
            return {
                status:400,
                data:null,
                err:{
                    message:"Ride is not completed"
                }
            }
        }
    }

}

module.exports=new UserRideService()