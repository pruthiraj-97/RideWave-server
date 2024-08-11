const express=require('express')
const { updateLocation,activateRidder,deActivateUser,startRide}=require('../controller/ridder')
const {isUserAuthenticate,isRider}=require('../middleware/isAuthenticate')
const router=express.Router()
router.put('/updatelocation/:id',isUserAuthenticate,updateLocation)
router.put('/activate/:id',isUserAuthenticate,isRider,activateRidder)
router.put('/deactivate/:id',isUserAuthenticate,isRider,deActivateUser)
router.put('/startride/:id',isUserAuthenticate,isRider,startRide)
module.exports=router