const router = require('express').Router();
const Users = require('./users-model');

// GET - returns all users
router.get('/', (req, res, next) => {
  Users.findUsers()
    .then((users) => res.status(200).json(users))
    .catch(next);
});

// GET - returns specified user
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Users.findByUserId(id)
    .then((users) => res.status(200).json(users))
    .catch(next);
});

// PUT - update a user
router.put('/:id', (req, res, next) => {
  const updatedUser = req.body;
  const { id } = req.params;
  Users.updateUser(id, updatedUser)
    .then((updatedUser) =>
      res.status(200).json({ message: `User updated`, updatedUser })
    )
    .catch(next);
});

// DELETE - remove a user
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Users.removeUser(id)
    .then(() => res.status(200).json({ message: 'User deleted' }))
    .catch(next);
});

// Error handling middleware
//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: 'There was an error in the server (users router)',
  });
});

module.exports = router;
