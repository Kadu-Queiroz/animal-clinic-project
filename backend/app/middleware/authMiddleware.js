const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token ausente.' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = { authenticate };
