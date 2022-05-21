const mysql = require('mysql');
const config = require('../config');

const connection  = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database : config.mysql.database
});

connection.connect(function(err) {
    if(err){
        console.log('Error de conexion a la base de datos');
        console.log('Error code: '+err.code);
        console.log('Error fatal: '+err.fatal);
    }
    else{
        console.log('Base de datos conectada');
    }
});

function getUsuarios(){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from usuarios';
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function getUsuario(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from usuarios where idUsuario='+id;
        connection.query(consulta, async (err, result) => {
            if (err) return reject(err);
            if (result.length == 1) {
                result[0].libros=await getLibrosUsuarioLeidos(result[0].idUsuario).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function getUsuarioListaDeseos(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from usuarios where idUsuario='+id;
        connection.query(consulta, async (err, result) => {
            if (err) return reject(err);
            if (result.length == 1) {
                result[0].libros=await getLibrosUsuarioDeseos(result[0].idUsuario).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addUsuario(usuario){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into usuarios (nombre) values ("'+usuario+'")';
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve('Usuario agregado, id: '+result.insertId);
        })
    });
}

function editUsuario(idUsuario,nombre){
    return new Promise((resolve, reject) => {
        let consulta = 'update usuarios set nombre="'+nombre+'" where idUsuario='+idUsuario;
        try{
            connection.query(consulta, async (err, result) => {
                if (err) return reject(err);                
                resolve('Usuario editado correctamente');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getCategorias(){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from categorias';        
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function getCategoria(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from categorias where idCategoria='+id;
        connection.query(consulta, async (err, result) => {
            if (err) return reject(err);
            if (result.length == 1) {
                console.log(result[0].idCategoria);
                result[0].libros=await getLibrosCategoria(result[0].idCategoria).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addCategoria(categoria){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into categorias (nombre) values ("'+categoria+'")';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('Categoria agregada, id: '+result.insertId);
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getAutores(){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from autores';        
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function getAutor(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from autores where idAutor='+id;
        connection.query(consulta, async (err, result) => {
            if (err) return reject(err);
            if (result.length == 1) {
                result[0].libros=await getLibrosAutor(result[0].idAutor).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addAutor(nombre,apellidos){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into autores (nombre, apellidos) values ("'+nombre+'","'+apellidos+'")';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('Autor agregado, id: '+result.insertId);
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getLibros(){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, avg(lu.nota) as nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro group by l.idlibro';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length > 0){
                for(let i=0; i<result.length; i++){
                    result[i].categorias=await getCategoriaLibro(result[i].idLibro).then((data)=>{
                        return data;
                    }).catch((err)=>{
                        console.log(err);
                    });
                }
            }
            resolve(result);
        })
    })
}

function getLibroId(id){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, avg(lu.nota) as nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idLibro='+id+' group by l.idlibro';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length == 1){
                result[0].categorias=await getCategoriaLibro(result[0].idLibro).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addLibro(titulo,idAutor,argumento,numPaginas,imagen,fecha,idSaga,posSaga,categorias){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into libros (titulo,idAutor,argumento,numPaginas,urlImagen,yearPublicacion,idSaga,posSaga) values ("'+titulo+'",'+idAutor+',"'+argumento+'",'+numPaginas+',"'+imagen+'","'+fecha+'",'+idSaga+','+posSaga+')';
        try{
            connection.query(consulta, async (err, result) => {
                if (err) return reject(err);
                for(let i=0; i<categorias.length; i++){
                    await addCategoriaLibro(result.insertId,categorias[i].idCategoria).then(()=>{
                        console.log('Categoria agregada');
                    }).catch((err)=>{
                        reject(err);
                    });
                }
                resolve('Libro agregado, id: '+result.insertId);
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function editLibro(idLibro,titulo,idAutor,argumento,numPaginas,imagen,fecha,idSaga,posSaga,categorias){
    return new Promise((resolve, reject) => {
        let consulta = 'update libros set titulo="'+titulo+'",idAutor='+idAutor+',argumento="'+argumento+'",numPaginas='+numPaginas+',urlImagen="'+imagen+'",yearPublicacion="'+fecha+'",idSaga='+idSaga+',posSaga='+posSaga+' where idLibro='+idLibro;
        try{
            connection.query(consulta, async (err, result) => {
                if (err) return reject(err);
                await delCategoriasLibro(idLibro).then(async ()=>{
                    for(let i=0; i<categorias.length; i++){
                        await addCategoriaLibro(idLibro,categorias[i].idCategoria).then(()=>{
                            console.log('Categoria agregada');
                        }).catch((err)=>{
                            reject(err);
                        });
                    }
                }).catch((err)=>{
                    console.log(err);
                });
                resolve('Libro editado correctamente');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getSagas(){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from sagas';        
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function getSaga(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select * from sagas where idSaga='+id;
        connection.query(consulta, async (err, result) => {
            if (err) return reject(err);
            if (result.length == 1) {
                result[0].libros=await getLibrosSaga(result[0].idSaga).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addSaga(nombre){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into sagas (nombre) values ("'+nombre+'")';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('Saga agregada, id: '+result.insertId);
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getCategoriaLibro(id){
    return new Promise((resolve, reject) => {
        let consulta = 'select lc.idCategoria, c.nombre from libros_categorias lc inner join categorias c on c.idCategoria=lc.idCategoria where lc.idLibro='+id;
        connection.query(consulta, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function addCategoriaLibro(idLibro,idCategoria){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into libros_categorias (idLibro,idCategoria) values ('+idLibro+','+idCategoria+')';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('Categoria agregada');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function delCategoriasLibro(idLibro){
    return new Promise((resolve, reject) => {
        let consulta = 'delete from libros_categorias where idLibro='+idLibro;
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('Categoria eliminada');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function getLibrosSaga(idSaga){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.posSaga, avg(lu.nota) as nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idSaga='+idSaga+' group by l.idlibro order by l.posSaga';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length == 1){
                result[0].categorias=await getCategoriaLibro(result[0].idLibro).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function getLibrosAutor(idAutor){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, avg(lu.nota) as nota FROM libros l left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idAutor='+idAutor+' group by l.idlibro';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length == 1){
                result[0].categorias=await getCategoriaLibro(result[0].idLibro).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function getLibrosCategoria(idCategoria){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, avg(lu.nota) as nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idLibro in (SELECT lc1.idLibro FROM libros_categorias lc1 where lc1.idCategoria='+idCategoria+') group by l.idlibro';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function getLibrosUsuarioLeidos(idUsuario){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, lu.nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idLibro in (SELECT lul.idLibro FROM libros_usuarios_leidos lul where lul.idUsuario='+idUsuario+' and lu.idUsuario='+idUsuario+')';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length == 1){
                result[0].categorias=await getCategoriaLibro(result[0].idLibro).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function getLibrosUsuarioDeseos(idUsuario){
    return new Promise((resolve, reject) => {
        let consulta = 'SELECT l.idLibro, l.titulo, l.idAutor, concat(a.nombre," ",a.apellidos) as autor, l.argumento, l.numPaginas, l.urlImagen as imagen, l.yearPublicacion, l.idSaga, s.nombre as saga, l.posSaga, avg(lu.nota) as nota FROM libros l inner join autores a on a.idAutor=l.idAutor left join sagas s on s.idSaga=l.idSaga left join libros_usuarios_leidos lu on lu.idLibro=l.idlibro where l.idLibro in (SELECT lud.idLibro FROM libros_usuarios_deseos lud where lud.idUsuario='+idUsuario+') group by l.idlibro';        
        connection.query(consulta, async(err, result) => {
            if (err) return reject(err);
            if(result.length == 1){
                result[0].categorias=await getCategoriaLibro(result[0].idLibro).then((data)=>{
                    return data;
                }).catch((err)=>{
                    console.log(err);
                });
            }
            resolve(result);
        })
    })
}

function addLibroUsuarioLeido(idLibro,idUsuario,nota){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into libros_usuarios_leidos (idLibro,idUsuario,nota) values ('+idLibro+','+idUsuario+','+nota+')';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('libro agregado');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function addLibroUsuarioDeseo(idLibro,idUsuario){
    return new Promise((resolve, reject) => {
        let consulta = 'insert into libros_usuarios_deseos (idLibro,idUsuario) values ('+idLibro+','+idUsuario+')';
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                resolve('libro agregado');
            })
        }
        catch(err){
            reject(err);
        }
    });
}

function delLibroUsuarioDeseo(idLibro,idUsuario){
    return new Promise((resolve, reject) => {
        let consulta = 'select id from libros_usuarios_deseos where idLibro='+idLibro+' and idUsuario='+idUsuario;
        try{
            connection.query(consulta, (err, result) => {
                if (err) return reject(err);
                if(result.length == 1){
                    let consulta = 'delete from libros_usuarios_deseos where idLibro='+idLibro+' and idUsuario='+idUsuario;
                    connection.query(consulta, (err, result) => {
                        if (err) return reject(err);
                        resolve('libro eliminado');
                    })
                }
                else{                
                    resolve('no esta el libro en la lista de deseos');
                }
            })
        }
        catch(err){
            reject(err);
        }
    });
}

// connection.end(function(){
//     console.log('base de datos desconectada');
// });

module.exports = {    
    getUsuarios,
    getUsuario,
    getUsuarioListaDeseos,
    addUsuario,
    editUsuario,
    getCategorias,
    getCategoria,
    addCategoria,
    getAutores,
    getAutor,
    addAutor,
    getLibros,
    getLibroId,
    addLibro,
    editLibro,
    getSagas,
    getSaga,
    addSaga,
    addLibroUsuarioLeido,
    addLibroUsuarioDeseo,
    delLibroUsuarioDeseo,
}