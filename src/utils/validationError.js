const { fromZodError }=require('zod-validation-error')
function ExtractError(error){
    const response=fromZodError(error)
    const message=dataValidationError(response.details)
    let errorMessage=[]
    message.forEach((err) => {
        errorMessage.push(err.message)
    });
    return errorMessage
}

module.exports={
    ExtractError
}