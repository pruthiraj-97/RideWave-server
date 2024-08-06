const express=require('express')
const { updateLocation,activateRidder,deActivateUser}=require('../controller/ridder')
const isUserAuthenticate=require('../middleware/isAuthenticate')
const router=express.Router()
router.put('/updatelocation/:id',isUserAuthenticate,updateLocation)
router.put('/activate/:id',isUserAuthenticate,activateRidder)
router.put('/deactivate/:id',isUserAuthenticate,deActivateUser)
module.exports=router