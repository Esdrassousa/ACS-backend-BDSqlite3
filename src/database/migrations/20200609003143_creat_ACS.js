
exports.up = function(knex) {
  return knex.schema.createTable('ACS', function(table){
      table.string('id').primary();
      table.string('nome').notNullable();
      table.string('email').notNullable().unique();
      table.string('senha').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ACS')
};
