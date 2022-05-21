const db = require('../../base_datos/bd');

function addLibro(libro){    
    return new Promise((resolve, reject) => {
        db.addLibro(libro.titulo,libro.idAutor,libro.argumento,libro.numPaginas,libro.imagen,libro.fecha,libro.idSaga,libro.posSaga,libro.categorias).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar el libro: ' + err);
            reject(err);
        });
    });
}

function editLibro(libro){    
    return new Promise((resolve, reject) => {
        db.editLibro(libro.id,libro.titulo,libro.idAutor,libro.argumento,libro.numPaginas,libro.imagen,libro.fecha,libro.idSaga,libro.posSaga,libro.categorias).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al editar el libro: ' + err);
            reject(err);
        });
    });
}

function getLibros(){
    return new Promise((resolve, reject) => {
        resolve(db.getLibros());
    });
}

function getLibroId(id){
    return new Promise((resolve, reject) => {
        resolve(db.getLibroId(id));
    });
}

function addLibroUsuarioLeido(libro){    
    return new Promise((resolve, reject) => {
        db.addLibroUsuarioLeido(libro.idLibro,libro.idUsuario,libro.nota).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar el libro: ' + err);
            reject(err);
        });
    });
}

function addLibroUsuarioDeseo(libro){    
    return new Promise((resolve, reject) => {
        db.addLibroUsuarioDeseo(libro.idLibro,libro.idUsuario).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar el libro: ' + err);
            reject(err);
        });
    });
}

function delLibroUsuarioDeseo(libro){    
    return new Promise((resolve, reject) => {
        db.delLibroUsuarioDeseo(libro.idLibro,libro.idUsuario).then((data) => {
            resolve(data);
        }).catch((err) => {
            console.log('Controlador, error al agregar el libro: ' + err);
            reject(err);
        });
    });
}

module.exports = {
    addLibro,
    getLibros,
    getLibroId,
    editLibro,
    addLibroUsuarioLeido,
    addLibroUsuarioDeseo,
    delLibroUsuarioDeseo,
}