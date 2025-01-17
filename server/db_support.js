const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME_S,
    process.env.DB_USER_S,
    process.env.DB_PASSWORD_S,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST_S,
        port: process.env.DB_PORT_S,
        // disable logging; default: console.log
        logging: false
    }
)