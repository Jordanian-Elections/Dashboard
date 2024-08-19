exports.up = function(knex) {
  return knex.schema.createTable('elections_time', function(table) {
    table.increments('id').primary();
    table.timestamp('start_date').notNullable();
    table.timestamp('end_date').notNullable();
    table.string('status').notNullable().defaultTo('upcoming'); // Can be 'upcoming', 'ongoing', or 'completed'
    table.string('title').notNullable(); // Add a title for the election
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('elections_time');
};