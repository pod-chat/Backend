exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('comment_votes')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('comment_votes').insert([
          {
            vote: 1,
            user_id: 1,
            comment_id: 2,
          },
          {
            vote: 2,
            user_id: 2,
            comment_id: 2,
          },
          {
            vote: 1,
            user_id: 3,
            comment_id: 2,
          },
          {
            vote: 1,
            user_id: 4,
            comment_id: 2,
          },
          {
            vote: 2,
            user_id: 5,
            comment_id: 2,
          },
        ]);
      });
  };