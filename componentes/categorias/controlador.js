const db = require('../../base_datos/bd');

function addCategoria(categoria){
    return new Promise((resolve, reject) => {
        db.addCategoria(categoria).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar la categoria: ' + err);
            reject(err);
        });
    });
}

function getCategorias(id){
    if(id!==undefined){
        return new Promise((resolve, reject) => {
            resolve(db.getCategoria(id));
        });
    }
    else{
        return new Promise((resolve, reject) => {
            resolve(db.getCategorias());
        });
    }
}

module.exports = {
    addCategoria,
    getCategorias,
}