const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will continue on if the token is inside the local storage

const authorization = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(403).json({ err: 'Invalid token' });
  }

  try {

    const verify = jwt.verify(token.slice(7), process.env.jwtSecret);

    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }

};

module.exports = authorization;