
exports.up = function (knex) {
	return knex.schema.createTable("ongs", function (tabela) {
		tabela.string("id").primary();
		tabela.string("nome").notNullable();
		tabela.string("email").notNullable();
		tabela.string("whatsapp").notNullable();
		tabela.string("cidade").notNullable();
		tabela.string("uf", 2).notNullable();
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("ongs");
};
