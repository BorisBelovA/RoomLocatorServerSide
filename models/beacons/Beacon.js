const {sequelize, Sequelize} = require('../../DB_config/Sequelize');

const Beacon = sequelize.define('Beacons',{
    UUID:{
        type:Sequelize.STRING,
        primaryKey: true
    },
        Coordinates:Sequelize.GEOMETRY('POINT'),
        Floor:Sequelize.INTEGER,
        Building_ID:Sequelize.INTEGER,
    },
    {
        timestamps: false
    });

module.exports = Beacon;