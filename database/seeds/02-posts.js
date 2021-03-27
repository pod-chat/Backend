exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          post_title: 'Elon musk dominates the world',
          post_body: 'lorem ipsum',
          post_upvotes: 10,
          post_downvotes: 5,
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: '1',
          user_id: 1,
        },
      ]);
    });
};
