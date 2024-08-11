const express=require('express')
const { updateLocation,activateRidder,deActivateUser,startRide}=require('../controller/ridder')
const {isUserAuthenticate,isRider}=require('../middleware/isAuthenticate')
const router=express.Router()
router.put('/updatelocation/:id',isUserAuthenticate,isRider,updateLocation) // more time
router.put('/activate/:id',isUserAuthenticate,isRider,isRider,activateRidder)
router.put('/deactivate/:id',isUserAuthenticate,isRider,isRider,deActivateUser)
module.exports=router