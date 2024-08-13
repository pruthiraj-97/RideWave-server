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
        const cost=wholePayment(distance)
        return {
            status:200,
            data:{
                nearRidders,
                cost,
                distance
            },
            err:null
        }
    }
    async connectRider(channel,nearRidders,source,destination,type,dist,userId) {
        const distance=parseFloat(dist)
        const payment=paymentForRide(type,distance)
        const otp=await generateotp()
        const newBooking=await BookingRepository.create(distance,userId,otp,type,source,destination,payment)
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
        const dropLocation={
            longitude:parseFloat(booking.dropOutLocation.coordinates[0]),
            latitude:parseFloat(booking.dropOutLocation.coordinates[1])
        }
        let distance=calculateDistance(dropLocation,{
            longitude:parseFloat(payload.longitude),
            latitude:parseFloat(payload.latitude)
        })
        // in kn
        distance=distance // in meter
        console.log("distance is ",distance)
        // HAS TO BE CHECKED
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
        const Booking=await BookingRepository.getById(payload.bookingId)
        if(Booking.status!='active'){
            return {
                status:400,
                data:{},
                err:{
                    message:"This ride is not active to complete"
                }
            }
        }
        await BookingRepository.completeRide(payload.bookingId)
        await RidderRepository.updateTotalRides(Booking.ridderId)
        await sendRideCompletionMessage(booking.userId,payload.bookingId)
        return {
            status:200,
            data:{
                message:"Ride completed succesfully"
            },
            err:null
        }
    }

    async Ratting(bookingId,riderId,ratting){
        ratting=parseFloat(ratting)
        const Booking=await BookingRepository.getById(bookingId)
        if(Booking.status!='completed'){
            return {
                status:400,
                data:{},
                err:{
                    message:"Ride is not completed"
                }
            }
        }
        const result=await RidderRepository.updateRatting(ratting,riderId)
        return {
            status:200,
            data:{
                message:"Ratted succesfully"
            },
            err:null
        }
    }

    async startTraking(bookingId){
        const Booking=await BookingRepository.getById(bookingId)
        if(Booking.status!='active'){
            return {
                status:400,
                data:{},
                err:{
                    message:"Ride is not active"
                }
            }
        }
        return {
            status:200,
            data:{
                newRide:Booking
            },
            error:null
        }
    }

}

module.exports=new UserRideService()