
exports.up = function(knex) {
    return knex.schema.createTable('membros', function(table){
        table.string('id').primary();
        table.string('nome').notNullable();
        table.string('cpf').notNullable().unique();
        table.string('parentesco').notNullable();
        table.string('idade').notNullable();

        table.string('familia_id').notNullable();
        table.foreign('familia_id').references('id').inTable('familia')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('membros')
};
