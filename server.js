const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./red/rutas');
const config = require('./config');
const port = config.port;

app.use(bodyParser.json());

router(app);

app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});