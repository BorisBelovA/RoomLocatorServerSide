const {sequelize, Sequelize} = require('../../DB_config/Sequelize');

const Building = sequelize.define('Buildings',{
    ID:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    Name:Sequelize.STRING,
    Matrix:Sequelize.ARRAY(Sequelize.ENUM),
    Nodes:Sequelize.ARRAY(Sequelize.STRING)
    },
    {
        timestamps: false
    });

module.exports = Building;