const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const userVerify = async (req, res, next) => {
  //console.log("token verification started",req.headers);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.role !== 'tenant' ) {
      return res.status(403).json({ message: 'Forbidden: Not an owner' });
    }

    req.user = { id: user._id, role: user.role };
   // console.log("token verification ended",req.user);
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { userVerify} ;
