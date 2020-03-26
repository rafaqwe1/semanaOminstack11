const conexao = require('../banco/conexao');

module.exports = {

	async index(requisicao, resposta) {
		const ong_id = requisicao.headers.authorization;

		const casos = await conexao('casos')
			.where('ong_id', ong_id).select("*");

		return resposta.json(casos);
	}

};