exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post_comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('post_comments').insert([
        {
          comment_lineage: '',
          comment_body: 'hellooooo',
          comment_upvote: 15,
          comment_downvote: 12,
          user_id: 1,
          post_id: 1,
        },
      ]);
    });
};
