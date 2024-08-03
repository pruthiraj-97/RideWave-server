const mongoose=require('mongoose')
const connectDB= async ()=>{
     try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected")
     } catch (error) {
        console.log("error in db connect")
        process.exit(1)
     }
}

module.exports=connectDB
