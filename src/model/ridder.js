const mongoose=require('mongoose')

const riderSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    ridderType:{
        type:String,
        enum:['auto','moto','go'],
        default:'auto'
    },
    isActivate:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const RiderSchema=mongoose.model('ridder',riderSchema)
module.exports=RiderSchema