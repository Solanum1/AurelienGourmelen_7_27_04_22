//----------------Déclarations et importations------------------
const models = require("../models/");
const fs = require("fs");

//----------------Logique métier--------------------------------

//Fonction de création d'un message
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
                        attachment: req.body.attachment,
                        UserId: user.id,
                        likes: 0,
                    })
                        .then((newMessage) => {
                            res.status(201).json(newMessage);
                        })
                        .catch(() => {
                            res.status(500).json({ error });
                        });
                }
            } else {
                res.status(400).json({ error });
            }
        })
        .catch((error) => {
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
            {
                model: models.Comments,
                attributes: ["id", "content", "createdAt"],
                include: [
                    {
                        model: models.User,
                        attributes: ["id", "username"],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    })
        .then((message) => {
            if (!message) {
                return res.status(400).json({ error: "Message non trouvé" });
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
            {
                model: models.Comments,
                attributes: ["id", "content", "createdAt"],
                include: [
                    {
                        model: models.User,
                        attributes: ["id", "username"],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    })
        .then((messages) => res.status(200).json(messages))
        .catch((error) => res.status(500).json({ error }));
};

//Modification d'un message
exports.updatePost = (req, res) => {
    const id = req.params.id;
    const data = req.file
        ? {
              title: req.body.title,
              content: req.body.content,
              userId: req.body.userId,
              attachment: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : {
              title: req.body.title,
              content: req.body.content,
              userId: req.body.userId,
          };

    models.Message.findByPk(id).then((message) => {
        const filename = message.attachment
            ? {
                  name: message.attachment.split("3000/")[1],
              }
            : {
                  name: message.attachment,
              };
        fs.unlink(`images/${filename.name}`, () => {
            models.Message.update(data, {
                where: { id: id },
            })
                .then((num) => {
                    if (num == 1) {
                        res.send({
                            message: "Le message a été mis à jour.",
                        });
                    } else {
                        res.send({
                            message:
                                "Erreur lors de la mise à jour de ce message",
                        });
                    }
                })
                .catch(() => {
                    res.status(500).send({
                        message: "Impossible de mettre à jour ce message",
                    });
                });
        });
    });
};

//Suppression d'un message
exports.deletePost = (req, res) => {
    models.Message.findOne({
        where: { id: req.params.id },
    })
        .then((messageFound) => {
            if (messageFound) {
                models.User.findOne({
                    attributes: ["isAdmin"],
                    where: { id: req.body.userId },
                })
                    .then((userIsAdmin) => {
                        if (
                            req.body.userId == messageFound.UserId ||
                            userIsAdmin.dataValues.isAdmin == true
                        ) {
                            models.Message.findOne({
                                where: { id: req.params.id },
                            })
                                .then((message) => {
                                    if (message.attachment) {
                                        const filename =
                                            message.attachment.split(
                                                "/images/"
                                            )[1];
                                        fs.unlink(`images/${filename}`, () => {
                                            models.Message.destroy({
                                                where: { id: message.id },
                                            })
                                                .then(() => res.end())
                                                .catch((err) =>
                                                    res.status(500).json(err)
                                                );
                                        });
                                    } else {
                                        models.Message.destroy({
                                            where: { id: message.id },
                                        })
                                            .then(() => res.end())
                                            .catch((err) =>
                                                res.status(500).json(err)
                                            );
                                    }
                                })
                                .then(() =>
                                    res
                                        .status(201)
                                        .json({ message: "Message supprimé" })
                                )
                                .catch((error) =>
                                    res.status(404).json({ error })
                                );
                        } else {
                            res.status(403).json({
                                error: "Vous n'êtes pas autorisé à supprimer le message",
                            });
                        }
                    })
                    .catch(() =>
                        res.status(500).json({
                            error: "Impossible de communiquer avec la base de données",
                        })
                    );
            } else {
                res.status(404).json({ error: "Message non trouvé" });
            }
        })
        .catch(() =>
            res
                .status(500)
                .json({ error: "Impossible de supprimer le message" })
        );
};
