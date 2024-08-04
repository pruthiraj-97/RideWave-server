const toRadians = (degrees) => degrees * Math.PI / 180;
const toDegrees = (radians) => radians * 180 / Math.PI;

function calculateDistance(source,destination) {
  const lat1 = parseFloat(source.latitude);
  const lon1 = parseFloat(source.longitude);
  const lat2 = parseFloat(destination.latitude);
  const lon2 = parseFloat(destination.longitude);
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; 
  return distance;
}

function calculateMidpoint(source,destination) {
  const lat1 = parseFloat(source.latitude);
  const lon1 = parseFloat(source.longitude);
  const lat2 = parseFloat(destination.latitude);
  const lon2 = parseFloat(destination.longitude);

  const lat1Rad = toRadians(lat1);
  const lon1Rad = toRadians(lon1);
  const lat2Rad = toRadians(lat2);
  const lon2Rad = toRadians(lon2);
  const Bx = Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);
  const By = Math.cos(lat2Rad) * Math.sin(lon2Rad - lon1Rad);

  const midLatRad = Math.atan2(
      Math.sin(lat1Rad) + Math.sin(lat2Rad),
      Math.sqrt((Math.cos(lat1Rad) + Bx) * (Math.cos(lat1Rad) + Bx) + By * By)
  );

  const midLonRad = lon1Rad + Math.atan2(By, Math.cos(lat1Rad) + Bx);
  const midLat = toDegrees(midLatRad);
  const midLon = toDegrees(midLonRad);

  return { latitude: midLat, longitude: midLon };
}



module.exports={
  calculateMidpoint,
  calculateDistance
}