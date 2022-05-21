const db = require('../../base_datos/bd');

function addSaga(saga){
    return new Promise((resolve, reject) => {
        db.addSaga(saga.nombre).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar la saga: ' + err);
            reject(err);
        });
    });
}

function getSagas(){
    return new Promise((resolve, reject) => {
        resolve(db.getSagas());
    });
}

function getSaga(id){
    return new Promise((resolve, reject) => {
        resolve(db.getSaga(id));
    });
}

module.exports = {
    addSaga,
    getSagas,
    getSaga,
}