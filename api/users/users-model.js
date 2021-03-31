const db = require('../../database/dbConfig');

function findUsers() {
  return db('users');
}

function findUserBy(filter) {
  return db('users').where(filter);
}

function findByUserId(id) {
  return db('users').where('user_id', id).first();
}

async function addUser(user) {
  const [user_id] = await db('users').insert(user, 'user_id');
  return findByUserId(user_id);
}

async function updateUser(id, updatedUser) {
  await db('users').where('user_id', id).update(updatedUser);
  return findByUserId(id);
}

function removeUser(id) {
  return db('users').where('user_id', id).del();
}

module.exports = {
  addUser,
  findUsers,
  findUserBy,
  findByUserId,
  updateUser,
  removeUser,
};
