const express=require('express')
const {findRidderNear,connectRider,acceptRideFromRider,trackRide,startRide,completeRide}=require('../controller/userride')
const {isUserAuthenticate,isRider}=require('../middleware/isAuthenticate')
const router=express.Router() 
router.get('/findrider',isUserAuthenticate,findRidderNear)  //d
router.get('/connectrider',isUserAuthenticate,connectRider)  //d
router.post('/acceptride/:id',isUserAuthenticate,isRider,acceptRideFromRider) //d
router.post('/trackride/:id',isUserAuthenticate,isRider,trackRide)
router.post('/startride/:id',isUserAuthenticate,isRider,startRide)
router.post('/completeride/:id',isUserAuthenticate,isRider,completeRide)
module.exports=router