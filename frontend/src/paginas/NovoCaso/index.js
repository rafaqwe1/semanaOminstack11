import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../recursos/logo.svg';

import './estilos.css';

import api from '../../servicos/api';


export default function NovoCaso() {

	const [titulo, setTitulo] = useState("");
	const [descricao, setDescricao] = useState("");
	const [valor, setValor] = useState("");

	const ongId = localStorage.getItem("ongId");

	const historico = useHistory();

	async function cadastrarCaso(e){
		e.preventDefault();

		const dados  = {titulo, descricao, valor};

		try {
			await api.post("/casos", dados,{
				headers: {
					Authorization: ongId
				}
			});

			historico.push("/home");
		}catch (erro){
			alert("Erro ao cadastrar caso, tente novamente.");
		}
		

	}

	return (
		<div className="novo-caso-container">
			<div className="conteudo">
				<section>
					<img src={logoImg} alt="Be The Hero" />
					<h1>Cadastrar novo caso</h1>
					<p>Descreva o caso detalhadamento para encontrar um herói para resolver isso.</p>

					<Link to="/home" className="link-voltar">
						<FiArrowLeft size={16} color="#E02041" />
						Voltar para home
					</Link>
				</section>

				<form onSubmit={cadastrarCaso}>
					<input
						placeholder="Título do caso"
						value={titulo}
						onChange={e => setTitulo(e.target.value)}
					/>

					<textarea
						placeholder="Descrição"
						value={descricao}
						onChange={e => setDescricao(e.target.value)}
					></textarea>

					<input
						placeholder="Valor em reais"
						value={valor}
						onChange={e => setValor(e.target.value)}
					/>

					<button type="submit" className="button">Cadastrar</button>
				</form>
			</div>
		</div>
	);
}