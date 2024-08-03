const { AuthService }=require('../service/index')
const { sigupValidate,loginValidation }=require('../zod/auth.validation')
const {ExtractError}=require('../utils/validationError')
async function signUp(req,res){
    try {
        const payload={
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
            contactNumber:parseInt(req.body.contactNumber)
        }
        const isValidate=sigupValidate.parse(payload)
        console.log(isValidate)
        if(!isValidate.success){
            const message=ExtractError(isValidate.error)
            return res.status(400).json({
                status:400,
                data:{},
                err:{
                    message // array of error
                }
            })
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
        // const isValiddata=loginValidation.parse({email,password})
        // if(!isValiddata.success){
        //    const message=ExtractError(isValiddata.error)
        //     return res.status(400).json({
        //         status:400,
        //         data:{},
        //         err:{
        //             message
        //         }
        //     })
        // }
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

async function activateRider(req,res){
    
}

module.exports={
    signUp,
    login
}