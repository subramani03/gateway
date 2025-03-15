// const jwt = require("jsonwebtoken");
const EventModel = require("../EventModel");

let UserAuth = async (req, res, next) => {
  try {
    let cookie = req.cookies;
    let { token } = cookie;
    if (!token) {
      console.log(token)
      return res.status(401).send("please login");
    }
    req.token = token;
    next();
  } catch (err) {
    res.status(404).send("error:"+err.message);    
  }
};

module.exports = { UserAuth };
