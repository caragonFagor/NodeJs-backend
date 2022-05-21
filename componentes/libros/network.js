const express = require('express');
const router = express.Router();
const response = require('../../red/response');
const controlador = require('./controlador');

const isLoggedIn = require('../auth/auth').isLoggedIn;

router.use(isLoggedIn);

router.get('/', peticionGet);
router.get('/:id', peticionGetId);
router.post('/', peticionPost);
router.post('/libro-usuario-leido/', peticionPostLibroUsuarioLeido);
router.post('/libro-usuario-deseo/', peticionPostLibroUsuarioDeseo);
router.patch('/', peticionPatch);
router.delete('/', peticionDelete);

function peticionGet(req, res) {
    controlador.getLibros().then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionGetId(req, res) {
    controlador.getLibroId(req.params.id).then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionPost(req, res) {    
    controlador.addLibro(req.body).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionPostLibroUsuarioLeido(req, res) { 
    controlador.addLibroUsuarioLeido(req.body).then((data) => {
       response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, 'err');
    });
}

function peticionPostLibroUsuarioDeseo(req, res) { 
    controlador.addLibroUsuarioDeseo(req.body).then((data) => {
       response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, 'err');
    });
}

function peticionPatch(req, res) {
    controlador.editLibro(req.body).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionDelete(req, res) {
    controlador.delLibroUsuarioDeseo(req.body).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

module.exports = router;