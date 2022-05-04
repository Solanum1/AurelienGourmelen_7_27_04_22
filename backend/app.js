//----------------------Initialisations---------------------------
//express
const express = require("express");
const app = express();
//helmet
const helmet = require("helmet");
app.use(helmet());
//dotenv
require("dotenv").config();

//----------------------Importation des routes--------------------

//----------------------Connexion à mySQL-------------------------
const dbConnection = require("./db/db");

//----------------------Middleware CORS --------------------------
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
//----------------------Enregistrement des routes---------------

//----------------------Exports---------------------------------
module.exports = app;
