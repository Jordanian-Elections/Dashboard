// migrations/2024xxxx_create_lists_and_candidates.js

exports.up = function(knex) {
    return knex.schema
      .createTable('lists', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description');
        table.boolean('active').defaultTo(true); // لتفعيل أو إلغاء تفعيل القائمة
        table.timestamps(true, true);
      })
      .createTable('candidates1', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('list_id').unsigned().references('id').inTable('lists').onDelete('CASCADE');
        table.text('details');
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('candidates')
      .dropTable('lists');
  };
  