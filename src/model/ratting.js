const mongoose=require('mongoose')
const rattingSchema=mongoose.Schema({
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
    ratting:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('ratting',rattingSchema)