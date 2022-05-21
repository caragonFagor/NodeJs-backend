const db = require('../../base_datos/bd');

function addAutor(autor){
    return new Promise((resolve, reject) => {
        db.addAutor(autor.nombre,autor.apellidos).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar el autor: ' + err);
            reject(err);
        });
    });
}

function getAutores(){
    return new Promise((resolve, reject) => {
        resolve(db.getAutores());
    });
}

function getAutor(id){
    return new Promise((resolve, reject) => {
        resolve(db.getAutor(id));
    });
}

module.exports = {
    addAutor,
    getAutores,
    getAutor,
}