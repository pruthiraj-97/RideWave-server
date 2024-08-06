const producerForLocationUpdate=async (channel,payload)=>{
    try {
        const LOCATION_QUEUE=process.env.LOCATION_QUEUE
        const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
        const BINDING_KEY_LOCATION=process.env.BINDING_KEY_LOCATION
        await channel.assertQueue(LOCATION_QUEUE)
        channel.publish(MESSAGE_EXCHANGER,BINDING_KEY_LOCATION,Buffer.from(JSON.stringify(payload)))
    } catch (error) {
        throw error
    }
}

const producerForRideConfirmation=async (channel,payload,newBooking)=>{
    try {
    const BINDING_KEY_RIDE=process.env.BINDING_KEY_RIDE
    const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
    const RIDE_QUEUE=process.env.RIDE_QUEUE 
    await channel.assertQueue(RIDE_QUEUE)
    const requiredData={
        payload,
        newBooking
    }
    channel.publish(MESSAGE_EXCHANGER,BINDING_KEY_RIDE,Buffer.from(JSON.stringify(requiredData)))
    } catch (error) {
        console.log("error in producer of ride confirmation")
    }
}

module.exports={
    producerForLocationUpdate,
    producerForRideConfirmation
}