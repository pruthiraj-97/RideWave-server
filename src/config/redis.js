require('dotenv').config()
const { createClient }=require('redis');
const redis_client = createClient({
    password: 'D12mjOuXAfynmJn16mSq1Y3RBwl8P6wl',
    socket: {
        host: 'redis-10532.c90.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 10532
    }
});

redis_client.on('error', (err) =>{ 
    console.log('Redis Client Error',err)
    process.exit(1)
});
redis_client.on('connect', () => {
    console.log('Redis Client Connected')
});

module.exports=redis_client