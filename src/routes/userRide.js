const express=require('express')
const {findRidderNear,connectRider,acceptRideFromRider,trackRide,startRide}=require('../controller/userride')
const {isUserAuthenticate}=require('../middleware/isAuthenticate')
const router=express.Router()
router.get('/findrider',isUserAuthenticate,findRidderNear)
router.get('/connectrider',isUserAuthenticate,connectRider)
router.post('/acceptride/:id',isUserAuthenticate,acceptRideFromRider)
router.post('/trackride',isUserAuthenticate,trackRide)
module.exports=router