//----------------------Initialisations---------------------------
//express
const express = require("express");
const app = express();

//helmet
const helmet = require("helmet");
app.use(helmet());

//dotenv
require("dotenv").config();

//Accéder au path du serveur
const path = require("path");

//----------------------Importation des routes--------------------

const usersRoutes = require("./routes/userRoute");
const postsRoutes = require("./routes/postRoute");

app.use(express.json());

//----------------------Middleware CORS --------------------------
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        //"*"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});
//----------------------Enregistrement des routes---------------

//gestion de la ressource image de manière statique à chaque requête vers la route /images
app.use("/images", express.static(path.join(__dirname, "images")));

//route attendue par le front pour l'enregistrement et la connexion utilisateur
app.use("/api/auth", usersRoutes);

//route pour la création, la modification et la suppression des posts (messages)
app.use("/api/posts", postsRoutes);

//----------------------Exports---------------------------------
module.exports = app;
