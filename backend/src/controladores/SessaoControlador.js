const conexao = require('../banco/conexao');

module.exports = {
	async criar(requisicao, resposta){
		const {id} = requisicao.body;

		const ong = await conexao('ongs').where('id', id).select("nome").first();	

		if(!ong){
			return resposta.status(400).json({erro: "Nenhuma ong encontrada com esse id"});
		}

		return resposta.json(ong);
	}
}