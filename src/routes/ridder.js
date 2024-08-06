const express=require('express')
const {registerRidder,loginRidder}=require('../controller/ridder')
const router=express.Router()
router.post('/register',registerRidder)
router.post('/login',loginRidder)
module.exports=router