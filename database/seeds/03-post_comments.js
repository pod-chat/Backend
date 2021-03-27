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
          comment_upvotes: 15,
          comment_downvotes: 12,
          post_id: 1,
          user_id: 1,
        },
      ]);
    });
};
