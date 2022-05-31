//--------------------------Déclarations et importations----------
// Importation d'express
const express = require("express");

// Permet de créer des routeurs séparés
const router = express.Router();

// Vérification que l'utilisateur est authentifié par token pour autoriser les reqûetes
const auth = require("../middleware/auth");

//multer
const multer = require("../middleware/multer-config");

// Controller postCtrl - logique métier
const postCtrl = require("../controllers/postCtrl");

//--------------------------Routes--------------------------------

//Route POST pour créer un message
router.post("/create", postCtrl.createPost);

//Route GET pour obtenir tous les messages
router.get("/", auth, postCtrl.getAllPosts);

//Route GET pour obtenir un message
router.get("/:id", postCtrl.getOnePost);

//Route PUT pour modifier un message
router.put("/update/:id", auth, postCtrl.updatePost);

//Route DELETE pour supprimer un message
router.delete("/delete/:id", auth, postCtrl.deletePost);

//--------------------------Exportation---------------------------
//On exporte le router de ce fichier
module.exports = router;
