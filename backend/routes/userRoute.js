//--------------------------Déclarations et importations----------
//importation d'express
const express = require("express");

//permet de créer des routeurs séparés
const router = express.Router();

//Middleware qui contrôle la validité de l'adresse email à l'enregistrement
//const email = require("../middleware/email");

//Middleware qui contrôle le mot de passe utilisateur à l'enregistrement
//const password = require("../middleware/password");

//import du controller userCtrl
const userCtrl = require("../controllers/userCtrl");

const auth = require("../middleware/auth");

//--------------------------Routes--------------------------------
//Route POST pour enregistrement d'un nouvel utilisateur
//router.post("/signup", email, password, userCtrl.signup);
router.post("/signup", userCtrl.signup);

//Route POST pour la connexion d'un utilisateur
router.post("/login", userCtrl.login);

//Route GET pour obtenir les informations du profil
router.get("/profile/:id", auth, userCtrl.getUser);

//Route PUT pour mettre les informations du profil
router.put("/profile/:id", auth, userCtrl.updateUser);

//Route DELETE pour obtenir les informations du profil
router.delete("/profile/:id", auth, userCtrl.deleteUser);

//--------------------------Exportation---------------------------
//On exporte le router de ce fichier
module.exports = router;
