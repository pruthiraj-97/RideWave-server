const paymentForRide=(type,distance)=>{
   if(type=='auto') return distance*10
   if(type=='moto')   return distance*15
   if(type=='go')     return distance*5
 }

 const wholePayment=(distance)=>{
   const cost={}
   cost['auto']=paymentForRide('auto',distance)
   cost['moto']=paymentForRide('moto',distance)
   cost['go']=paymentForRide('go',distance)
   return cost
 }

 module.exports={
    paymentForRide,
    wholePayment
 }