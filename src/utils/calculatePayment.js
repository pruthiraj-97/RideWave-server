const paymentForRide=(type,distance)=>{
   if(type=='auto') return distance*10
   if(type=='moto')   return distance*15
   if(type=='go')     return distance*5
 }

 module.exports={
    paymentForRide
 }