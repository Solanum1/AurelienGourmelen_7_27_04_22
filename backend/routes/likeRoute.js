//--------------------------Déclarations et importations----------
// Importation d'express
const express = require("express");

// Permet de créer des routeurs séparés
const router = express.Router();

// Vérification que l'utilisateur est authentifié par token pour autoriser les reqûetes
const auth = require("../middleware/auth");

// Controller postCtrl - logique métier
const likeCtrl = require("../controllers/likeCtrl");

//--------------------------Routes--------------------------------

//Route GET pour obtenir les 'likes' d'un message
router.get("/:id/like", auth, likeCtrl.getLike);

//Route POST pour aimer un message
router.post("/:id/like", auth, likeCtrl.addLike);

//Route DELETE pour annuler le 'like' d'un message
router.delete("/:id/like", auth, likeCtrl.removeLike);

//--------------------------Exportation---------------------------
module.exports = router;
