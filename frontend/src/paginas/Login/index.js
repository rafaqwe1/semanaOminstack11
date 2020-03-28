import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'

import './estilos.css';

import api from '../../servicos/api';

import logoImg from '../../recursos/logo.svg';
import heroesImg from '../../recursos/heroes.png';

export default function Login() {

	const [id, setId] = useState("");

	const historico = useHistory();

	async function logar(e) {
		e.preventDefault();


		try {
			const resposta = await api.post("sessao", { id });

			localStorage.setItem('ongId', id);
			localStorage.setItem('ongNome', resposta.data.nome);

			historico.push("/home");
		} catch (erro) {
			alert("Falha no login, tente novamente.");
		}
	}

	return (
		<div className="login-container">
			<section className="form">
				<img src={logoImg} alt="Be The Hero" />
				<form onSubmit={logar}>
					<h1>Faça seu login</h1>

					<input
						placeholder="Seu ID"
						value={id}
						onChange={e => setId(e.target.value)}
					/>

					<button className="button" type="submit">Entrar</button>
					<Link to="/cadastro" className="link-voltar">
						<FiLogIn size={16} color="#E02041" />
						Não tenho cadastro
					</Link>
				</form>

			</section>

			<img src={heroesImg} alt="Heroes" />

		</div>
	)
}