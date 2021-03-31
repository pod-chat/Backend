const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../../config/jwtSecret');
const Users = require('../users/users-model');
const {
  checkRegisterPayload,
  checkLoginPayload,
  checkEmailUnique,
  checkHandleUnique,
} = require('../middleware/authMiddleware');

// POST - add a new user
router.post(
  '/register',
  checkEmailUnique,
  checkRegisterPayload,
  checkHandleUnique,
  (req, res) => {
    const credentials = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.user_password, rounds);
    credentials.user_password = hash;

    Users.addUser(credentials)
      .then((user) =>
        res.status(201).json({ message: 'User registered', data: user })
      )
      .catch((err) =>
        res.status(500).json({
          custom: 'Error registering a user',
          message: err.message,
          stack: err.stack,
        })
      );
  }
);

// POST - log in an existing user
router.post('/login', checkLoginPayload, (req, res) => {
  const { user_email, user_password } = req.body;

  Users.findUserBy({ user_email: user_email })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(user_password, user.user_password)) {
        const token = buildToken(user);
        res.status(200).json({
          message: `Welcome to PodChat, ${user.user_display_name}`,
          user,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch((err) => {
      res.status(500).json({
        custom: 'Error logging in',
        message: err.message,
        stack: err.stack,
      });
    });
});

function buildToken(user) {
  const payload = {
    subject: user.id,
    user_display_name: user.use_display_name,
    user_email: user.user_email,
    user_handle: user.user_handle,
  };
  const config = {
    expiresIn: '30d',
  };
  return jwt.sign(payload, jwt_secret, config);
}

module.exports = router;
