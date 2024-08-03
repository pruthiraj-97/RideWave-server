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

module.exports={
    producerForLocationUpdate
}