const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config/jwtSecret');
const User = require('../users/users-model');

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({ message: 'Please log in' });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res
          .status(401)
          .json({ message: 'Please log in, user is unauthorized' });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  }
};

const checkEmailUnique = async (req, res, next) => {
  try {
    const rows = await User.findUserBy({ user_email: req.body.user_email });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json({ message: 'Email is taken' });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const checkHandleUnique = async (req, res, next) => {
  try {
    const rows = await User.findUserBy({ user_handle: req.body.user_handle });
    if (!rows.length) {
      next();
    } else {
      res.status(401).json({ message: 'User handle is taken' });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const checkLoginPayload = (req, res, next) => {
  if (!req.body.user_email || !req.body.user_password) {
    res.status(401).json({ message: 'Please provide an email and password' });
  } else {
    next();
  }
};

const checkRegisterPayload = (req, res, next) => {
  if (
    !req.body.user_display_name ||
    !req.body.user_email ||
    !req.body.user_handle ||
    !req.body.user_password
  ) {
    res.status(401).json({ message: 'Please provide the required fields' });
  } else {
    next();
  }
};

module.exports = {
  checkEmailUnique,
  checkLoginPayload,
  checkRegisterPayload,
  restricted,
  checkHandleUnique,
};
