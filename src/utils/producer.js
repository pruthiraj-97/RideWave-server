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

const producerForRideTracking=(channel,payload)=>{
      try {
        const BINDING_KEY_TRACKING=process.env.BINDING_KEY_TRACKING
        const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
        const TRACKING_QUEUE=process.env.TRACKING_QUEUE
        channel.assertQueue(TRACKING_QUEUE)
        channel.publish(MESSAGE_EXCHANGER,BINDING_KEY_TRACKING,Buffer.from(JSON.stringify(payload)))
      } catch (error) {
        console.log("error in publishing the tracking update")
      }
}

module.exports={
    producerForLocationUpdate,
    producerForRideConfirmation,
    producerForRideTracking
}