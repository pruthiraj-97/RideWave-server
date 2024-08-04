const express=require('express')
const {connectRidder}=require('../controller/userride')
const router=express.Router()
router.get('/connectrider',connectRidder)
module.exports=router