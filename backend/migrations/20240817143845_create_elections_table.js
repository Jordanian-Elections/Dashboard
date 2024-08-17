exports.up = function(knex) {
    return knex.schema.createTable('elections_time', function(table) {
      table.increments('id').primary();
      table.timestamp('start_date').notNullable();
      table.timestamp('end_date').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('elections_time');
  };
  