import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import logoImg from "../../recursos/logo.svg";
import './estilos.css';

import api from '../../servicos/api';

export default function Perfil() {

	const ongId = localStorage.getItem("ongId");
	const ongNome = localStorage.getItem('ongNome');
	const [casos, setCasos] = useState([]);

	const historico = useHistory();

	useEffect(() => {
		api.get("perfil", {
			headers: {
				Authorization: ongId
			}
		}).then(resposta => {
			setCasos(resposta.data);
		});
	}, [ongId]);


	async function deletarCaso(id){
		try{
			await api.delete("casos/" + id, {
				headers: {
					Authorization: ongId
				}
			});

			setCasos(casos.filter(caso => caso.id !== id));

		}catch(erro){
			alert("Erro ao deletar caso, tente novamente.");
		}
	}

	function logout(){
		localStorage.clear();
		historico.push("/");
	}

	return (
		<div className="perfil-container">
			<header>
				<img src={logoImg} alt="Be The Hero" />
				<span>Bem vindo(a), {ongNome}</span>

				<Link to="casos/novo" className="button">Cadastrar novo caso</Link>

				<button type="button" onClick={logout}>
					<FiPower size={18} color="#E02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{
					casos.map(caso => (
						<li key={caso.id}>
							<strong>CASO:</strong>
							<p>{caso.titulo}</p>

							<strong>DESCRIÇÃO:</strong>
							<p>{caso.descricao}</p>

							<strong>VALOR:</strong>
							<p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

							<button type="button" onClick={() => deletarCaso(caso.id)}>
								<FiTrash2 size={20} color="#a8a8b3" />
							</button>
						</li>
					))
				}

			</ul>
		</div>
	)
}