
exports.up = function(knex) {
    return knex.schema.createTable('familia', function(table){
        table.string('id').primary();
        table.string('numero').notNullable().unique();

        table.string('ACS_id').notNullable();
        table.foreign('ACS_id').references('id').inTable('ACS')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('familia')
  
};
