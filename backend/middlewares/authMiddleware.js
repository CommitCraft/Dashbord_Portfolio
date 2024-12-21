const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  // const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;