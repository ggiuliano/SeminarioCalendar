const express = require('express')
const moment = require('moment')
const { getConnection } = require('./models/db/connection')
const { PORT } = require('./config/globals')
const app = express()
const Evento = require('./controller/eventos')

app.use(express.static('public'))


app.use(express.json())
app.use(express.urlencoded({extended: true}))



//LEVANTO EL SERVER
getConnection().then((message) => { 
    console.log(message);
    app.listen(PORT, () =>{
        console.log(`Listening on port: ${PORT}`);
    });
}).catch(console.log);

//RUTA PARA TEST
app.get('/init', async (req, res) => {

    const evento1 = await new Evento().agregarEvento("My test event A", new Date(2022,9,30), new Date(2022,9,31))
    const evento2 = await new Evento().agregarEvento("My test event B", new Date(2022,9,30), new Date(2022,9,31))
    const evento3 = await new Evento().agregarEvento("My test event C", new Date(2022,9,30), new Date(2022,9,31))

    res.send("Test events were added to the database")
});

//RUTA PARA TEST
app.get('/data', async (req, res) => {
    let data = await new Evento().buscarEventos()

    for (let i=0; i < data.length; i++){
        data[i].id = data[i]._id.toString()
    }

    res.send(data);

});

app.post('/data', async (req, res) => {
    var data = req.body;

    var mode = data["!nativeeditor_status"];
    console.log(data)
    var sid = data.id;
    var tid = sid;


    function update_response(err, result){
        if (err)
            mode = "error";
        else if (mode == "inserted")
            tid = data._id;

        res.setHeader("Content-Type","application/json");
        res.send({action: mode, sid: sid, tid: tid});

    }
    
    if (mode == 'updated'){
        const editEvent = await new Evento().editarEvento(tid,data)
        update_response()
    } else if(mode == "inserted"){
        const newEvent = await new Evento().sumarEvento(data)
        update_response()
    } else if(mode == 'deleted'){
        const borrarEvent = await new Evento().borrarEvento(tid)
        update_response()
    }

})