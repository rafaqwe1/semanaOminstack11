import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../recursos/logo.svg';
import './estilos.css';
import api from '../../servicos/api'

export default function Cadastro() {

	const [nome, setNome] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [cidade, setCidade] = useState('');
	const [uf, setUf] = useState('');

	const historico = useHistory();

	async function cadastrar(e) {
		e.preventDefault();

		const dados = {
			nome,
			email,
			whatsapp,
			cidade,
			uf
		};
		try {
			const resposta = await api.post("ongs", dados);
			alert(`Seu ID de acesso: ${resposta.data.id}`);
			historico.push("/");
		} catch (erro) {
			alert("Erro no cadastro, tente novamente.");
		}

	}


	return (
		<div className="cadastro-container">
			<div className="conteudo">
				<section>
					<img src={logoImg} alt="Be The Hero" />
					<h1>Cadastro</h1>
					<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

					<Link to="/" className="link-voltar">
						<FiArrowLeft size={16} color="#E02041" />
						Já tenho cadastro
					</Link>
				</section>

				<form onSubmit={cadastrar}>
					<input
						placeholder="Nome da ONG"
						value={nome}
						onChange={e => setNome(e.target.value)}
					/>

					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					<input
						placeholder="Whatsapp"
						value={whatsapp}
						onChange={e => setWhatsapp(e.target.value)}
					/>

					<div className="input-group">
						<input
							placeholder="Cidade"
							value={cidade}
							onChange={e => setCidade(e.target.value)}
						/>
						<input
							placeholder="UF"
							style={{ width: 80 }}
							value={uf}
							onChange={e => setUf(e.target.value)}
						/>
					</div>

					<button type="submit" className="button">Cadastrar</button>
				</form>
			</div>
		</div>
	);
}