const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyToken = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).json('Unauthorized Request')
  }
  const token =  req.headers.authorization.split(' ')[1]
  

  if (!token) {
    return res.status(401).json("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, 'pranay');
    req.userId = decoded.id;
    if(!decoded){
      return res.status(401).json("A token is required for authentication");
    }
    console.log(decoded)
    
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
  
  return next();
};


const enhance = async (req, res, next) => {
  try {
    if(!req.headers.authorization){
      return res.status(401).json('Unauthorized Request')
    }
    const token =  req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'pranay');
    
    const user = await User.findOne({
      email: decoded.email,
    });
    console.log(user)
    if (!user || user.role !== 'admin') throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = {verifyToken, enhance};