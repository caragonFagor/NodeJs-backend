const express = require('express');
const router = express.Router();
const response = require('../../red/response');
const controlador = require('./controlador');

router.get('/', peticionGet);
router.get('/:id', peticionGetId);
router.post('/', peticionPost);

function peticionGet(req, res) {
    controlador.getSagas().then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionGetId(req, res) {
    controlador.getSaga(req.params.id).then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionPost(req, res) {    
    controlador.addSaga(req.body).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

module.exports = router;