const {HOST, USER,DB, PASSWORD} = require('./db_connect');
const   Sequelize = require('sequelize')

const sequelize = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    operatorsAliases: false,

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