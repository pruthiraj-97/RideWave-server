const express=require('express')
const { updateLocation,activateRidder,deActivateUser}=require('../controller/ridder')
const router=express.Router()
router.put('/updatelocation/:id',updateLocation)
router.put('/activate/:id',activateRidder)
router.put('/deactivate/:id',deActivateUser)
module.exports=router