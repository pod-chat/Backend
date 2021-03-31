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
          user_image: 'IMG_1912.jpg',
          user_password: '12345',
        },
        {
          user_display_name: 'Elon Musk',
          user_email: 'elon@musk.com',
          user_handle: '@elonmusk',
          user_image: 'IMG_1912.jpg',
          user_password: '12345',
        },
        {
          user_display_name: 'Juan Ruiz',
          user_email: 'juan@ruiz.com',
          user_handle: '@juan',
          user_image: 'IMG_1912.jpg',
          user_password: '12345',
        },
        {
          user_display_name: 'Clint Fix',
          user_email: 'clint@fix.com',
          user_handle: '@clintfix',
          user_image: 'IMG_1912.jpg',
          user_password: '12345',
        },
      ]);
    });
};
