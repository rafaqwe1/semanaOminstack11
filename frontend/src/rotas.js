import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Perfil from './paginas/Perfil';
import NovoCaso from './paginas/NovoCaso';

export default function Rotas(){
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Login}/>
				<Route path="/cadastro" component={Cadastro}/>
				<Route path="/home" component={Perfil}/>
				<Route path="/casos/novo" component={NovoCaso}/>
			</Switch>
		</BrowserRouter>
	);
};