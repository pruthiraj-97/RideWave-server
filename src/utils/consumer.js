const updateLocationRiderInDB=require('../utils/ridderLocationUpdate')
const consumerForLocationUpdate=async (channel)=>{
    try {
        const LOCATION_QUEUE=process.env.LOCATION_QUEUE
        const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
        const BINDING_KEY_LOCATION=process.env.BINDING_KEY_LOCATION

        const applicationQueue=await channel.assertQueue(LOCATION_QUEUE);
        channel.bindQueue(applicationQueue.queue,MESSAGE_EXCHANGER,BINDING_KEY_LOCATION)
        channel.consume(applicationQueue.queue,(data)=>{
            const payload=JSON.parse(data.content.toString())
            const type=payload.type
            const longitude=parseFloat(payload.longitude)
            const latitude=parseFloat(payload.latitude)
            const ridderId=payload.ridderId
            updateLocationRiderInDB(type,longitude,latitude,ridderId)
            channel.ack(data);
        })
    } catch (error) {
        throw error
    }
}

module.exports={
    consumerForLocationUpdate
}