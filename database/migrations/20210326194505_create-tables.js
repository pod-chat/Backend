exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id');
      tbl.string('user_first_name');
      tbl.string('user_last_name');
      tbl.string('user_email');
      tbl.string('user_username');
      tbl.datetime('user_created_on').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('posts', (tbl) => {
      tbl.increments('post_id');
      tbl.string('post_title').notNullable();
      tbl.string('post_body').notNullable();
      tbl.integer('post_upvotes');
      tbl.integer('post_downvotes');
      tbl.integer('post_clip_start').notNullable();
      tbl.integer('post_clip_end').notNullable();
      tbl.datetime('post_created_on').notNullable().defaultTo(knex.fn.now());
      tbl.string('podcast_episode_id').notNullable();
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl.integer('comment_id').unsigned();
    })

    .createTable('post_comments', (tbl) => {
      tbl.increments('comment_id');
      tbl.string('comment_lineage');
      tbl.string('comment_body').notNullable();
      tbl.integer('comment_upvotes');
      tbl.integer('comment_downvotes');
      tbl.datetime('comment_created_on').notNullable().defaultTo(knex.fn.now());
      tbl.integer('post_id').notNullable();
      tbl.integer('user_id').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('post_comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
