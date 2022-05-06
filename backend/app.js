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

const usersRoutes = require("./routes/userRoute");

//Vérif réponse du serveur
// app.use((req, res, next) => {
//     res.status(201);
//     res.json({ message: "Votre requête a bien été reçue !" });
//     next();
// });

app.use(express.json());

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

//route attendue par le front
app.use("/api/auth", usersRoutes);

//----------------------Exports---------------------------------
module.exports = app;
