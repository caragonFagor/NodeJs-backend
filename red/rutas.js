const usuarios = require('../componentes/usuarios/network');
const categorias = require('../componentes/categorias/network');
const autores = require('../componentes/autores/network');
const libros = require('../componentes/libros/network');
const sagas = require('../componentes/sagas/network');

const routes = function (server){
    server.use('/usuarios', usuarios);
    server.use('/categorias', categorias);
    server.use('/autores', autores);
    server.use('/libros', libros);
    server.use('/sagas', sagas);
}

module.exports =  routes;