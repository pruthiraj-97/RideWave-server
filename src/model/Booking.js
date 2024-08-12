const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({
     distance:{
         type:Number,
         required:true
     },
     ridderId:{
         type:mongoose.Types.ObjectId,
         ref:"ridder"
     },
     userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        default:null
     },
     rideType:{
        type:String,
        enum:['auto','moto','go'],
        require:true
     },
     payment:{
         type:Number,
         required:true
     },
     otp:{
         type:Number,
         required:true
     },
     pickUpLocation:{
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        },
    },
    dropOutLocation:{
        type: {
            type: String, 
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    status:{
        type:String,
        enum:['pending','active','completed','cancel'],
        default:'pending'
    }

},{timestamps:true})

const BookingSchema=mongoose.model('booking',bookingSchema)
module.exports=BookingSchema