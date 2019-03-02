const express = require('express');
const app = express();
//const connection = require('./DB_config/db_connect');
const Beacon = require('./models/beacons/Beacon');
const Building = require('./models/building/Building');
const path = require('path');

//Костыль для того, чтобы сервер общялся с клиентом. ЧИТАЙ ПРО CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.get('/', (req,res)=>{
    /*Beacon.findAll()
        .then(beacon => {
            console.log(beacon[0].dataValues);
        });
    res.send('Find One');*/
    res.send('Hello');
});

app.get('/get_building', (req,res)=>{
    Building.findAll()
        .then(building=>{
            console.log(building[0].dataValues);
        });
    res.send('Find Building');
});

app.get('/get_building/:id', (req,res)=>{
    let id = req.params.id;
    Building.findAll({
        where:{
            ID:id
        }
    }).then(result=>{
        console.log(result[0].dataValues)
        let matrix = result[0].dataValues.Matrix;
        console.log(matrix[0][0])
    })
    res.send('Ok')
})

app.get('/map', (req,res)=>{
    let pathToMap = __dirname+'/Maps/';
    console.log(pathToMap);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.sendFile(pathToMap+'HomePlan.svg');
})

app.listen(3001)