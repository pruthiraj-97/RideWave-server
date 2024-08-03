const { z }=require('zod')

const sigupValidate=z.object({
    email:z.string().email(),
    password:z.string().min(6,{message:"min 6 character"}),
    username:z.string().min(6,{message:"min 6 character"}),
    contactNumber:z.number().min(10,{message:"min 10 character"}).max(10,{message:"max 10 character"})
                                    .refine((value)=>value.length===10)
})

const loginValidation=z.object({
    email:z.string().email(),
    password:z.string()
})



module.exports={
    sigupValidate,
    loginValidation
}