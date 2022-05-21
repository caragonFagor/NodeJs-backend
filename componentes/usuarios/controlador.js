const db = require('../../base_datos/bd');

function addUsuario(usuario){
    return new Promise((resolve, reject) => {
        resolve(db.addUsuario(usuario));
    });
}

function getUsuarios(id,listaDeseos){
    if(id!==undefined){
        if(listaDeseos=='true'){
            return new Promise((resolve, reject) => {
                resolve(db.getUsuarioListaDeseos(id));
            });
        }
        else{
            return new Promise((resolve, reject) => {
                resolve(db.getUsuario(id));
            });
        }
    }
    else{
        return new Promise((resolve, reject) => {
            resolve(db.getUsuarios());
        });
    }
}

function editUsuario(usuario){
    return new Promise((resolve, reject) => {
        db.editUsuario(usuario.idUsuario,usuario.nombre).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al editar el usuario: ' + err);
            reject(err);
        });
    });
}

module.exports = {
    addUsuario,
    getUsuarios,
    editUsuario
}