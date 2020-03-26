
exports.up = function (knex) {
	return knex.schema.createTable("casos", function (tabela) {
		tabela.increments();
		tabela.string("titulo").notNullable();
		tabela.string("descricao").notNullable();
		tabela.decimal("valor").notNullable();

		tabela.string("ong_id").notNullable();
		tabela.foreign("ong_id").references("id").inTable("ongs");
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable("casos");
};
