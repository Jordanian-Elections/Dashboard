exports.up = function(knex) {
    return knex.schema.createTable('circles', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.text('boundaries');
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('circles');
  };
  