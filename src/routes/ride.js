const express=require('express')
const { updateLocation,activateRidder,deActivateUser,startRide}=require('../controller/ridder')
const {isUserAuthenticate,isRider}=require('../middleware/isAuthenticate')
const router=express.Router()
router.put('/updatelocation/:id',isUserAuthenticate,isRider,updateLocation) // d
router.put('/activate/:id',isUserAuthenticate,isRider,isRider,activateRidder) // d
router.put('/deactivate/:id',isUserAuthenticate,isRider,isRider,deActivateUser) // err
module.exports=router