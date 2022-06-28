//----------------Déclarations et importations------------------
const models = require("../models/");

// const dotenv = require("dotenv");
// dotenv.config();


//----------------Logique métier--------------------------------


//Fonction d'ajout d'un like
exports.addLike = async (req, res) => {
    console.log(req.body.Message);
    const postLiked = await models.Message.findOne({
        where: { id: req.params.id}});
    models.Message.update(
        {
            likes: postLiked + 1,
        },
        {
            where: { id: req.params.id},
        }
    );
    return res.status(201).json({ message: "Like ajouté" });
}

//Fonction de suppression d'un like
exports.removeLike = async (req, res) => {
    const postUnliked = await models.Message.findOne({
        where: { id: req.params.id}});
    models.Message.update(
        {
            likes: postUnliked - 1,
        },
        {
            where: { id: req.params.id},
        }
    );
    return res.status(201).json({ message: "Like retiré" });
}


//Fonction pour obtenir le nombre de likes d'un message
exports.getLike = async (req, res) => {
    models.Message.findOne({
        where: { id: req.params.id}
    })
    .then((message) => {
        res.status(200).json({"likes": message.likes});
    })
    .catch((error) => res.status(500).json({error}))
}

