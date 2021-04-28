exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('user_id');
      tbl.string('user_display_name').notNullable();
      tbl.string('user_email').notNullable().unique();
      tbl.string('user_handle').notNullable().unique();
      tbl.binary('user_image');
      tbl.string('user_password').notNullable();
      tbl.datetime('user_created_on').defaultTo(knex.fn.now());
    })
    .createTable('posts', (tbl) => {
      tbl.increments('post_id');
      tbl.string('post_title').notNullable();
      tbl.string('post_body').notNullable();
      tbl.string('post_clip_start').notNullable();
      tbl.string('post_clip_end').notNullable();
      tbl.datetime('post_created_on').defaultTo(knex.fn.now());
      tbl.string('podcast_episode_id').notNullable();
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

    .createTable('post_comments', (tbl) => {
      tbl.increments('comment_id');
      tbl.string('comment_lineage');
      tbl.string('comment_body').notNullable();
      tbl.datetime('comment_created_on').defaultTo(knex.fn.now());
      tbl
        .integer('post_id')
        .notNullable()
        .unsigned()
        .references('post_id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

    .createTable('post_votes', (tbl) => {
      tbl.increments('vote_id');
      tbl.integer('vote').notNullable(); //1 = upvote, 2 = downvote
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('post_id')
        .notNullable()
        .unsigned()
        .references('post_id')
        .inTable('posts')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

    .createTable('comment_votes', (tbl) => {
      tbl.increments('vote_id');
      tbl.integer('vote').notNullable(); //1 = upvote, 2 = downvote
      tbl
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      tbl
        .integer('comment_id')
        .notNullable()
        .unsigned()
        .references('comment_id')
        .inTable('post_comments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('comment_votes')
    .dropTableIfExists('post_votes')
    .dropTableIfExists('post_comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users');
};
