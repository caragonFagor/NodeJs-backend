module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST || 'host',
        user: process.env.MYSQL_USER || 'user',
        password: process.env.MYSQL_PASS || 'password',
        database: process.env.MYSQL_DB || 'bd_name',
    },
    port : process.env.PORT || 3000,
}
