//--------------------------Déclarations et importations----------
//importation d'express
const express = require("express");

//méthode express.Router() pour créer des routeurs séparés
const router = express.Router();

//import de la logique métier par le controller commentCtrl
const commentCtrl = require("../controllers/commentCtrl");

//import de multer qui permet le téléchargement de fichiers images
const multer = require("../middleware/multer-config");

//import de auth pour protéger les routes en vérifiant que l'utilisateur est authentifié pour l'envoi de ses requêtes
const auth = require("../middleware/auth");

//--------------------------Routes--------------------------------
router.post("/:id/comment", auth, multer, commentCtrl.createComment);
router.put("/:id/comment/:id", auth, commentCtrl.updateComment);
router.delete("/:id/comment/:id", auth, commentCtrl.deleteComment);

//--------------------------Exportation---------------------------
module.exports = router;
