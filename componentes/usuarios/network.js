const express = require('express');
const router = express.Router();
const response = require('../../red/response');
const controlador = require('./controlador');

router.get('/', peticionGet);
router.get('/:id', peticionGet);
router.post('/', peticionPost);
router.patch('/', peticionPatch);

function peticionGet(req, res) {
    controlador.getUsuarios(req.params.id,req.body.listaDeseos).then((lista) => {
        response.success(req, res, lista, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

// function peticionGetId(req, res) {    
//     console.log(req.params.id);
//     response.success(req, res, 'Hemos pedido un id',200);
// }

function peticionPost(req, res) {
    controlador.addUsuario(req.body.nombre).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

function peticionPatch(req, res) {
    controlador.editUsuario(req.body).then((data) => {
        response.success(req, res, data, 200);
    }).catch((err) => {
        response.error(req, res, 'Internal error', 500, err);
    });
}

module.exports = router;