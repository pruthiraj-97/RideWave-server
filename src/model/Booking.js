const mongoose=require('mongoose')
const bookingSchema=mongoose.Schema({
     distance:{
         type:Number,
         required:true
     },
     ridderId:{
         type:mongoose.Types.ObjectId,
         ref:"ridder",
         required:true
     },
     userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
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
        address: {
            type: String,
            required: true
        }
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
        },
        address: {
            type: String,
            required: true
        }
    },
    status:{
        type:String,
        enum:['pending','active','completed','cancel'],
        default:'pending'
    },
    ratting:{
        type:mongoose.Types.ObjectId,
        ref:"ratting"
    }

},{timestamps:true})

const BookingSchema=mongoose.model('booking',bookingSchema)
module.exports=BookingSchema