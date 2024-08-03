const amqplib=require('amqplib')
const createConnection=async ()=>{
    try {
      const connection = await amqplib.connect(process.env.RABBITMQ_HOST);
      const channel = await connection.createChannel();
      await channel.assertExchange(process.env.MESSAGE_EXCHANGER, 'direct', { durable: false });
      console.log('Channel created and exchange asserted');
      return channel
    } catch (error) {
        console.log('Error in channel connection',error)
        process.exit(1)
    }
}

module.exports=createConnection