const db = require('../../database/dbConfig');

function getAllPosts() {
  return db('posts as p').join('users as u', 'p.user_id', 'u.user_id');
}

function getPostById(id) {
  return db('posts as p')
    .where('post_id', id)
    .join('users as u', 'p.user_id', 'u.user_id');
}

function getAllComments(id) {
  return db('post_comments as pc')
    .where('post_id', id)
    .join('users as u', 'pc.user_id', 'u.user_id');
}

function getCommentById(id) {
  return db('post_comments as pc')
    .where('comment_id', id)
    .join('users as u', 'pc.user_id', 'u.user_id');
}

async function addPost(newPost) {
  const [post_id] = await db('posts as p')
    .insert(newPost, 'post_id')
    .innerJoin('users as u', 'p.user_id', 'u.user_id');
  return getPostById(post_id);
}

async function addComment(newComment) {
  const [comment_id] = await db('post_comments')
    .insert(newComment, 'comment_id')
    .join('users as u', 'p.user_id', 'u.user_id');
  return getCommentById(comment_id);
}

async function deletePost(id) {
  const removedPost = await getPostById(id);
  await db('posts').where('post_id', id).del();
  return removedPost;
}

async function deleteComment(id) {
  const removedComment = await getCommentById(id);
  await db('post_comments').where('comment_id', id).del();
  return removedComment;
}

async function updatePost(id, updatedPost) {
  await db('posts')
    .where('post_id', id)
    .update(updatedPost)
    .join('users as u', 'p.user_id', 'u.user_id');
  return getPostById(id);
}

async function updateComment(id, updateComment) {
  await db('post_comments')
    .where('comment_id', id)
    .update(updateComment)
    .join('users as u', 'p.user_id', 'u.user_id');
  return getCommentById(id);
}

module.exports = {
  getAllPosts,
  getPostById,
  getAllComments,
  getCommentById,
  addPost,
  deletePost,
  deleteComment,
  addComment,
  updatePost,
  updateComment,
};
