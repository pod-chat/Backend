const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

const postsRouter = require('./posts/posts-router');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/posts', postsRouter);
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;
