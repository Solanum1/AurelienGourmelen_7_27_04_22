//----------------Déclarations et importations------------------
const models = require("../models/");

// const dotenv = require("dotenv");
// dotenv.config();


//----------------Logique métier--------------------------------


//Fonction pour ajouter d'un like

exports.addLike = (req, res) => {
    const like = {
        MessageId: req.body.MessageId,
        UserId: req.auth.userId,
    };
    models.Likes.create(like)
    .then((data) => {
        // res.send(data);
        res.status(201).send({data, message: "Like ajouté"})
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Il n'est pas possible de liker ce message.",
        });
    });
};


//Fonction de suppression d'un like
exports.deleteLike = (req, res) => {
    models.Likes.findOne({ where: { UserId: req.auth.userId, MessageId: req.params.id } })
    .then((like) => {
        like
        .destroy()
        .then(() => res.status(200).json({ message: "Like retiré" }))
        .catch((error) => {
            res.status(404).json({ error });
        });
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};


//Fonction pour obtenir le nombre de likes d'un message
exports.getLike = async (req, res) => {
    models.Likes.findAll({ where: { MessageId: req.params.id } })
    .then((post) => {
        res.status(200).json(post);
    })
    .catch((error) => res.status(500).json({ error }));
};

