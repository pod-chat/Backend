const Posts = require('../posts/posts-model');

const checkPostPayload = (req, res, next) => {
  if (
    !req.body.post_title ||
    !req.body.post_body ||
    !req.body.post_clip_start ||
    !req.body.post_clip_end ||
    !req.body.podcast_episode_id ||
    !req.body.user_id
  ) {
    res.status(401).json({ message: 'Please provide required fields' });
  } else {
    next();
  }
};

const checkIfPostExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.getPostById(id);
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
    } else {
      req.post = post;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkIfCommentExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Posts.getCommentById(id);
    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
    } else {
      req.comment = comment;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { checkPostPayload, checkIfPostExists, checkIfCommentExists };
