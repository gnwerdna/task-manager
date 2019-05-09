const jwt = require("jsonwebtoken");
const User = require("../models/user");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // res.send(decoded);
    console.log("decoded._id:" + decoded._id);
    const user = await User.find({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      throw new Error();
    } 
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "please authenticated." });
  }
};

module.exports = auth;
