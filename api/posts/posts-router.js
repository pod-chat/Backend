const router = require('express').Router();
const Posts = require('./posts-model');
const {
  checkPostPayload,
  checkIfPostExists,
  checkIfCommentExists,
} = require('../middleware/postsMiddleware');
const { restricted } = require('../middleware/authMiddleware');

// GET all posts
router.get('/', (req, res, next) => {
  Posts.getAllPosts()
    .then((posts) => res.status(200).json(posts))
    .catch(next);
});

// GET post by id
router.get('/:id', checkIfPostExists, (req, res, next) => {
  const { id } = req.params;
  Posts.getPostById(id)
    .then((post) => res.status(200).json(post))
    .catch(next);
});

// GET all comments from specified post
router.get('/:id/comments', checkIfPostExists, (req, res, next) => {
  const { id } = req.params;
  Posts.getAllComments(id)
    .then((comments) => res.status(200).json(comments))
    .catch(next);
});

// GET comment by comment id
router.get('/comments/:id', checkIfCommentExists, (req, res, next) => {
  const { id } = req.params;
  Posts.getCommentById(id)
    .then((comment) => res.status(200).json(comment))
    .catch(next);
});

// POST creates a new post
router.post('/', checkPostPayload, restricted, (req, res, next) => {
  const newPost = req.body;
  Posts.addPost(newPost)
    .then((newPost) =>
      res.status(201).json({ message: 'New posted created', newPost })
    )
    .catch(next);
});

// POST creates a new comment on a post
router.post('/comments', restricted, (req, res, next) => {
  const newComment = req.body;
  Posts.addComment(newComment)
    .then((comment) =>
      res.status(201).json({ message: 'Added new comment', comment })
    )
    .catch(next);
});

// PUT updates a post
router.put('/:id', checkIfPostExists, restricted, (req, res, next) => {
  const { id } = req.params;
  const updatedPost = req.body;
  Posts.updatePost(id, updatedPost)
    .then((updatedPost) =>
      res.status(201).json({ message: 'Post updated', updatedPost })
    )
    .catch(next);
});

// PUT updates a comment
router.put(
  '/comments/:id',
  checkIfCommentExists,
  restricted,
  (req, res, next) => {
    const { id } = req.params;
    const updatedComment = req.body;
    Posts.updateComment(id, updatedComment)
      .then((updatedComment) =>
        res.status(201).json({ message: 'Comment updated', updatedComment })
      )
      .catch(next);
  }
);

// DELETE an existing post
router.delete('/:id', checkIfPostExists, restricted, (req, res, next) => {
  const { id } = req.params;
  Posts.deletePost(id)
    .then((deletedPost) =>
      res.status(200).json({ message: 'Post deleted', deletedPost })
    )
    .catch(next);
});

// DELETE a specified comment from a specified post
router.delete(
  '/comments/:id',
  checkIfCommentExists,
  restricted,
  (req, res, next) => {
    const { id } = req.params;
    Posts.deleteComment(id)
      .then((deletedComment) =>
        res.status(200).json({ message: 'Comment deleted', deletedComment })
      )
      .catch(next);
  }
);

// Error handling middleware
//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
    custom: '500 error in the server (posts)',
  });
});

module.exports = router;
