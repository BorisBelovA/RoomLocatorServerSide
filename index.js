const express = require('express');
const app = express();
//const connection = require('./DB_config/db_connect');
const Beacon = require('./models/beacons/Beacon');
const Building = require('./models/building/Building');
const path = require('path');

const fs = require('fs');

//Костыль для того, чтобы сервер общялся с клиентом. ЧИТАЙ ПРО CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.get('/', (req,res)=>{
    Beacon.findAll()
        .then(beacon => {
            console.log(beacon[0].dataValues);
            res.send(beacon[0].dataValues);
        });

    /*res.send('Hello');*/
});

app.get('/get_building', (req,res)=>{
    Building.findAll()
        .then(building=>{
            console.log(building[0].dataValues);
            res.send(building[0].dataValues);
        });
    //res.send('Find Building');
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
        res.send(result[0].dataValues)
    })
    //res.send('Find Building', req.params.id)
})


function getMap(mapName){
    let path = `${__dirname}/Maps/${mapName}`;
    console.log(path)
    return new Promise((resolve,reject)=>{
        fs.readFile(`${path}/Map.svg`, (err,data)=> {
            if (err) reject(err);
            else resolve(data.toString());
        });
    })
}

function getBulding(building_ID){
    return Building.findAll({
        where:{
            ID:building_ID
        }
    })
}

async function retrievAllDataAboutBuilding(building_ID){
    //При получении ID здания -> обращаемся в БД за матрицей и имнем здания
    //Имея имя здания находим карту, Формируем объект-ответ для пользователя {map:map,matrix:matrix}
    let query = await getBulding(building_ID);
    let map = await getMap(query[0].dataValues.Name);
    let matrix = query[0].dataValues.Matrix;
    let nodes = query[0].dataValues.Nodes;
    return {map:map,matrix:matrix, nodes:nodes};
}


//При запросе выдать соответствующую карту
app.get('/map/:name', (req,res)=>{
    let name = req.params.name.toLocaleLowerCase();
    /*let answer = {
        map:null,
        matrix:null
    }
    Building.findAll({
        where:{
            Name:name
        }
    }).then(result=>{
        answer.matrix = result[0].dataValues.Matrix;
    })
    .then(()=>{
        console.log(answer)
    });*/
    retrievAllDataAboutBuilding(2).then(result=>{
        //console.log(result)});
        res.setHeader('type','image/svg+xml');
        res.send(result);
    });

    //res.setHeader('type','image/svg+xml');
    /*res.sendFile(`${path}/Map.svg`, (err)=>{
        //Выводим ошибку пользователю, а сами можем залогировать ее
        if (err) res.send('Sorry, can\'t find that map! :(')
    });*/

    //res.send('ok');

    //res.sendFile(`${path}/Map.svg`);
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3001;
}
app.listen(port);


