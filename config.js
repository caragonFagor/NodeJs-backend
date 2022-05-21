module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST || 'POAPMYSQL141.dns-servicio.com',
        user: process.env.MYSQL_USER || 'qDQknna7BpFT6HQ',
        password: process.env.MYSQL_PASS || 'Etbm6bfWK9dry2p!',
        database: process.env.MYSQL_DB || '8426721_libros',
    },
    port : process.env.PORT || 3000,
}