const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
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
},{timestamps:true})

const UserSchema=mongoose.model('user',userSchema)
module.exports=UserSchema