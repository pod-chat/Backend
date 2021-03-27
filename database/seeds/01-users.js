exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          user_display_name: 'Bob',
          user_email: 'b@s.com',
          user_handle: '@bobbysmith',
          user_password: '12345',
        },
      ]);
    });
};
