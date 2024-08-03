const { RidderSchema }=require('../model/index')
class ridderRepository{
    async create(data){
       const newRidder=await RidderSchema.create(data)
       return newRidder
    }
    async findById(id){
       const isRidderExist=await RidderSchema.findById(id)
       return isRidderExist
    }
    async findByEmail(email){
       const isRidderExist=await RidderSchema.findOne({email})
       return isRidderExist 
    }
    async findByContactNumber(contactNumber){
        const isRidderExist=await RidderSchema.findOne({contactNumber})
        return isRidderExist
    }
    async activate(userId){
       const activateRidder=await RidderSchema.updateOne({_id:userId},{
           $set:{
            isActivate:true
           }
       })
       return activateRidder
    }
    async deactivate(userId){
        const deactivateRidder=await RidderSchema.updateOne({_id:userId},{
            $set:{
             isActivate:false
            }
        })
        return deactivateRidder
    }
}

module.exports=new ridderRepository()