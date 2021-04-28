const { default: knex } = require('knex');
const db = require('../../database/dbConfig');

async function getAllPosts() {
  return await db('posts as p')
    .join("post_votes as pv", "p.post_id", "pv.post_id")
    .join("users as u", "u.user_id", "p.user_id")
    .groupBy("p.post_id", "u.user_id")
    .select(
      "p.*", 
      "u.user_display_name",
      "u.user_handle",
      "u.user_image", 
      db.raw(
        `jsonb_agg(pv.user_id) filter (where pv.vote = 1) as "upvotes",
        jsonb_agg(pv.user_id) filter (where pv.vote =2 ) as "downvotes"`)
    )
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
