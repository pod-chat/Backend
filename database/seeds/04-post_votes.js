exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('post_votes')
      .del()
      .then(function () {
        // Inserts seed entries
        return knex('post_votes').insert([
          {
            vote: 1,
            user_id: 1,
            post_id: 1,
          },
          {
            vote: 2,
            user_id: 2,
            post_id: 1,
          },
          {
            vote: 1,
            user_id: 3,
            post_id: 1,
          },
          {
            vote: 1,
            user_id: 4,
            post_id: 1,
          },
          {
            vote: 2,
            user_id: 5,
            post_id: 1,
          },
        ]);
      });
  };
  