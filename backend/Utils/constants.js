const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/api/';
console.log(process.env.NODE_ENV);
module.exports = { BASE_URL };
