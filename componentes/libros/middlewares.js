const response = require('../../red/response');

const middlewares = {

    isLoggedIn : function (req, res, next) {
        console.log('Estamos en el middleware isLoggedIn');
        next();
        // console.log(req.body);
        // if(req.body.user=='hola'){
        //     console.log('Usuario correcto');
        //     next();
        // }
        // else{
        //     console.log('Usuario incorrecto');
        //     response.error(req, res, 'No estas logeado', 500, 'No estas logeado');
        // }
    }
};
module.exports = middlewares;
