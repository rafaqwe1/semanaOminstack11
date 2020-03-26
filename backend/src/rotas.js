const express = require('express');

const rotas = express.Router();
const ongControlador = require('./controladores/OngControlador');
const casoControlador = require('./controladores/CasoControlador');
const perfilControlador = require('./controladores/PerfilControlador');
const sessaoControlador = require('./controladores/SessaoControlador');

rotas.get("/ongs", ongControlador.index);
rotas.post("/ongs", ongControlador.cadastrar);

rotas.get("/casos", casoControlador.index);
rotas.post("/casos", casoControlador.cadastrar);
rotas.delete("/casos/:id", casoControlador.deletar);

rotas.get("/perfil", perfilControlador.index);
rotas.post("/sessao", sessaoControlador.criar);
module.exports = rotas;

