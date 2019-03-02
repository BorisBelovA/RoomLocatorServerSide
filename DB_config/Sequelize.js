const {HOST, USER,DB, PASSWORD, PORT} = require('./db_connect');
const   Sequelize = require('sequelize')

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    dialectOptions: {
        "ssl": true
    },
    operatorsAliases: false,
    port:PORT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

module.exports = {
    sequelize:sequelize,
    Sequelize:Sequelize
}