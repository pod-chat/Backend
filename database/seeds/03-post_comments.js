exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('post_comments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('post_comments').insert([
        {
          comment_lineage: '',
          comment_body:'Badass post! You should come on my pod so we can chat!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '',
          comment_body: 'Upvotes: 2. Make America Great Again!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '2/',
          comment_body: 'New Child Comment',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '2/3/',
          comment_body:
            'Thanks, Juan! I appreciate you! Lets build a killer app!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '2/3/4/',
          comment_body:
            'Thanks, Juan! I appreciate you! Lets build a killer app!gdfgfdgfdgfdgfdg',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '2/',
          comment_body: 'JJ! I cannot wait to hang out again',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '3/',
          comment_body: 'Clint made a fantastic point. Well said, Clint!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '5/',
          comment_body: 'Clint! What is up, dude? We need to hang out again!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '5/8/',
          comment_body:
            'UPVOTES: 3. This is my comment on this post. I think it is brilliant.',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '8/',
          comment_body:
            'Joe! We need to do another podcast and talk about Dogecoin!',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '8/',
          comment_body: 'Shut up you old socialist idiot.',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '',
          comment_body: 'ANOTHER TEST COMMENT',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
        {
          comment_lineage: '',
          comment_body: 'cANOTHER TEST COMMENT',
          comment_upvotes: 4,
          comment_downvotes: 3,
          user_id: 1,
          post_id: 1,
        },
      ]);
    });
};
