const { AuthService }=require('../service/index')
const { sigupValidate,loginValidation }=require('../validateData/auth.validation')
const {signUpValidate,loginValidate}=require('../validateData/auth.validation')
async function signUp(req,res){
    try {
        const {email,password,username,contactNumber}=req.body
        const message=signUpValidate(email,password,username,contactNumber)
        if(!message.success){
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message:message.error
                }
            })
        }
        const payload={
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
            contactNumber:parseInt(req.body.contactNumber)
        }
        const response=await AuthService.signUp(payload)
        return res.status(response.status).json(response)
    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some think went wrong"+error
            }
        })
    }
}

async function login(req,res) {
    try {
        const {email,password}=req.body
        const isValidate=loginValidate(email,password)
        if(!isValidate.success){
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message:isValidate.error
                }
            })
        }
      const message=await AuthService.login(req.body,res)
      return res.status(message.status).json(message)

    } catch (error) {
        return res.status(500).json({
            status:500,
            data:{},
            err:{
                message:"some thing went wrong"+error
            }
        })
    }
}


module.exports={
    signUp,
    login
}