const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const verify = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: '❌ Unauthorized: No token provided' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: '❌ Unauthorized: User not found' });
    }

    if (user.role !== 'owner') {
      return res.status(403).json({ message: '❌ Forbidden: Access only for owners' });
    }

    req.user = { id: user._id, role: user.role }; // Attach user to request
   // console.log("✅ Token verified:", req.user);
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: '❌ Invalid token' });
  }
};

module.exports = { verify };
