require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type,Accept,Authortization");  
    res.header('Acces-Control-Allow-Methods', "GET, POST, PUT, DELETE" );
    app.use(cors());
    next();

});

app.use(express.json());
app.use(routes);

app.listen(3333, ()=>{
    console.log("Servidor ON");
})