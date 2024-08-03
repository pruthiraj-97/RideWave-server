const {UserSchema}=require('../model/index')
class UserRepository{
    async create(data){
        const user=await UserSchema.create(data)
        return user
    }
    async findByEmail(email){
      const user=await UserSchema.findOne({email})
      return user
    }
    async findById(id){
       const user=await UserSchema.findById(id)
       user.password=undefined
       return user
    }
    async findByContactNumber(contactNumber){
        const user=await UserSchema.findOne({contactNumber})
        return user
    }
}

module.exports= new UserRepository()