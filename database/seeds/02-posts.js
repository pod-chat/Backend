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
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 1,
        },
        {
          post_title: 'asdfasdfsdfsafsaf',
          post_body: 'asdfasddfdsafsdfs',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 1,
        },
        {
          post_title: 'testtesttest',
          post_body: 'lorem ipsum',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 1,
        },
        {
          post_title: 'Elon musk dominates the world',
          post_body: 'lorem ipsum',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 2,
        },
        {
          post_title: 'asdfasdfsdfsafsaf',
          post_body: 'asdfasddfdsafsdfs',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 2,
        },
        {
          post_title: 'testtesttest',
          post_body: 'lorem ipsum',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 2,
        },
        {
          post_title: 'Elon musk dominates the world',
          post_body: 'lorem ipsum',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 3,
        },
        {
          post_title: 'asdfasdfsdfsafsaf',
          post_body: 'asdfasddfdsafsdfs',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 3,
        },
        {
          post_title: 'testtesttest',
          post_body: 'lorem ipsum',
          post_clip_start: '600',
          post_clip_end: '620',
          podcast_episode_id: 'd0becd4e21bc4349b21078236427b6d7',
          user_id: 3,
        },
      ]);
    });
};
