const express=require('express')
const {findRidderNear,connectRider,acceptRideFromRider}=require('../controller/userride')
const isUserAuthenticate=require('../middleware/isAuthenticate')
const router=express.Router()
router.get('/findrider',isUserAuthenticate,findRidderNear)
router.get('/connectrider',isUserAuthenticate,connectRider)
router.post('/acceptride/:id',isUserAuthenticate,acceptRideFromRider)
module.exports=router