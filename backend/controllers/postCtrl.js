//----------------Déclarations et importations------------------
const models = require("../models/");
const fs = require("fs");

//----------------Logique métier--------------------------------

//Post d'un message
exports.createPost = (req, res) => {
    models.User.findOne({
        where: { id: req.body.UserId },
    })
        .then((user) => {
            if (user !== null) {
                let attachment;
                if (req.file != undefined) {
                    attachment = `${req.protocol}://${req.get("host")}/images/${
                        req.file.filename
                    }`;
                } else {
                    attachment == null;
                }
                if (req.body.content == "" && req.file == undefined) {
                    res.status(400).json({
                        error: "Il n'y a aucun contenu à ajouter !",
                    });
                } else {
                    models.Message.create({
                        title: req.body.title,
                        content: req.body.content,
                        attachment: attachment,
                        UserId: user.id,
                        likes: 0,
                    })
                        .then((newMsg) => {
                            res.status(201).json(newMsg);
                        })
                        .catch((err) => {
                            res.status(500).json(err);
                        });
                }
            } else {
                res.status(400).json();
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "erreur serveur" });
        });
};

//Lecture d'un message
exports.getOnePost = (req, res) => {
    models.Message.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: models.User,
                attributes: ["id", "username"],
            },
        ],
    })
        .then((message) => {
            if (!message) {
                return res
                    .status(400)
                    .json({ error: "Message non disponible !" });
            }
            res.status(200).json(message);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Lecture de tous les messages
exports.getAllPosts = (req, res) => {
    models.Message.findAll({
        include: [
            {
                model: models.User,
                attributes: ["username"],
            },
        ],
        order: [["createdAt", "DESC"]],
    })
        .then((messages) => res.status(200).json(messages))
        .catch((error) => res.status(500).json({ error }));
};

//Modification d'un message
exports.updatePost = (req, res) => {};

//Suppression d'un message
exports.deletePost = (req, res) => {};
