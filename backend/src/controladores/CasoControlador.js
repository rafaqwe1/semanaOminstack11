const conexao = require('../banco/conexao');

module.exports = {

	async index(requisicao, resposta) {

		const { pagina = 1 } = requisicao.query;

		const [total] = await conexao("casos").count();

		const casos = await conexao('casos')
			.select(['casos.*', 'ongs.nome', 'ongs.email', 'ongs.whatsapp', 'ongs.cidade', 'ongs.uf'])
			.join("ongs", "ongs.id", "=", "casos.ong_id")
			.limit(5)
			.offset((pagina - 1) * 5);

		resposta.header("X-Total-Itens", total['count(*)']);

		return resposta.json(casos);
	},

	async cadastrar(requisicao, resposta) {
		const { titulo, descricao, valor } = requisicao.body;
		const ong_id = requisicao.headers.authorization;

		const [id] = await conexao("casos").insert({
			titulo,
			descricao,
			valor,
			ong_id
		});

		resposta.json({ id });

	},

	async deletar(requisicao, resposta) {
		const { id } = requisicao.params;
		const ong_id = requisicao.headers.authorization;

		const caso = await conexao('casos').where('id', id).select('ong_id').first();

		if (caso.ong_id != ong_id) {
			return resposta.status(401).json({ erro: "Operação não permitida" })
		}

		await conexao('casos').where('id', id).delete();

		return resposta.status(204).send();

	}
}