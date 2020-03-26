
const crypto = require('crypto');
const conexao = require('../banco/conexao');


module.exports = {

	async index(requisicao, resposta) {

		const ongs = await conexao('ongs').select("*");

		return resposta.json(ongs);
	},

	async cadastrar(requisicao, resposta) {
		const { nome, email, whatsapp, cidade, uf } = requisicao.body;

		const id = crypto.randomBytes(4).toString('HEX')

		await conexao('ongs').insert({
			id,
			nome,
			email,
			whatsapp,
			cidade,
			uf
		});

		return resposta.json({ id });
	}
}