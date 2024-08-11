const updateLocationRiderInDB=require('../utils/ridderLocationUpdate')
const {boardCastnewRide,boardcastlocation}=require('./boardCastRideNotification')
const {trackRideLocation}=require('./boardCastRideNotification')
const BookingRepository=require('../repository/booking')
const {sendRequestForRideDelay}=require('./sendConfimRideToUser')
const consumerForLocationUpdate=async (channel)=>{
    try {
        const LOCATION_QUEUE=process.env.LOCATION_QUEUE
        const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
        const BINDING_KEY_LOCATION=process.env.BINDING_KEY_LOCATION

        const applicationQueue=await channel.assertQueue(LOCATION_QUEUE);
        channel.bindQueue(applicationQueue.queue,MESSAGE_EXCHANGER,BINDING_KEY_LOCATION)
        channel.consume(applicationQueue.queue,async(data)=>{
            const payload=JSON.parse(data.content.toString())
            const type=payload.type
            const longitude=parseFloat(payload.longitude)
            const latitude=parseFloat(payload.latitude)
            const ridderId=payload.ridderId
            await updateLocationRiderInDB(type,longitude,latitude,ridderId)
            channel.ack(data);
        })
    } catch (error) {
        throw error
    }
}


const consumeForRideConfirmation=async (channel)=>{
   const BINDING_KEY_RIDE=process.env.BINDING_KEY_RIDE
   const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
   const RIDE_QUEUE=process.env.RIDE_QUEUE

   const applicationQueue=await channel.assertQueue(RIDE_QUEUE)
   channel.bindQueue(applicationQueue.queue,MESSAGE_EXCHANGER,BINDING_KEY_RIDE)
   channel.consume(applicationQueue.queue,(data)=>{
      const requiredData=JSON.parse(data.content.toString())
      const newBooking=requiredData.newBooking
      const payload=requiredData.payload
      boardCastnewRide(payload,newBooking)
    
    //  setTimeout(async ()=>{
    //      const checkRide=await BookingRepository.getById(newBooking._id)
    //      const message=await BookingRepository.deleteBooking(newBooking._id)
    //      console.log(message,newBooking._id)
    //      if(!checkRide.ridderId){
    //         await sendRequestForRideDelay(newBooking._id)
    //      }
    //  },1*60*10000)
    //   channel.ack(data)
   })
}

const consumeForTrackingRide=async (channel)=>{
    const TRACKING_QUEUE=process.env.TRACKING_QUEUE
    const MESSAGE_EXCHANGER=process.env.MESSAGE_EXCHANGER
    const BINDING_KEY_TRACKING=process.env.BINDING_KEY_TRACKING
    const applicationQueue=channel.assertQueue(TRACKING_QUEUE)
    channel.bindQueue(applicationQueue.queue,MESSAGE_EXCHANGER,BINDING_KEY_TRACKING)
    channel.consume(applicationQueue.queue,(data)=>{
        const payload=JSON.parse(data.content.toString())
        console.log(payload)
        trackRideLocation(payload)
        channel.ack(data)
    })
}

module.exports={
    consumerForLocationUpdate,
    consumeForRideConfirmation,
    consumeForTrackingRide
}