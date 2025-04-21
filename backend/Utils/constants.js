const BASE_URL =
  process.env.NODE_ENV === 'production' ? 'http://localhost:3000/' : 'https://gateway-6epe.onrender.com/';
console.log(process.env.NODE_ENV);
module.exports = { BASE_URL };
