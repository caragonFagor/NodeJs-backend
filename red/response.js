function success(req, res, mensaje, estado) {
    res.status(estado).send({
        "error": false,
        "mensaje": mensaje,
    });
}

function error(req, res, mensaje, estado, detalles) {
    console.error('[response error] ' + detalles);
    res.status(estado).send({
        "error": true,
        "mensaje": mensaje,
    });
}

module.exports={
    success,
    error,
}