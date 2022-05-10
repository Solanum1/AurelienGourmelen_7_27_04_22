//----------------Déclarations et importations------------------
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models/");
const dotenv = require("dotenv").config();

//----------------Logique métier--------------------------------

exports.signup = (req, res, next) => {
    let emailReq = req.body.email;
    //méthode findOne/where de Sequelize
    models.User.findOne({
        where: { email: emailReq },
    })
        //vérification que l'adresse mail n'est pas déjà dans la bdd
        .then((userFound) => {
            if (!userFound) {
                bcrypt.hash(req.body.password, 10).then((hash) => {
                    models.User.create({
                        email: req.body.email,
                        username: req.body.username,
                        password: hash,
                        isAdmin: 0,
                    }).then(() => {
                        res.status(201).json({ message: "Utilisateur créé" });
                    });
                });
            } else {
                res.status(403).json({
                    error: "Cette adresse mail existe déjà, merci de choisir une autre adresse mail",
                });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

//Fonction de login
exports.login = (req, res, next) => {
    models.User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) {
                    return res
                        .status(401)
                        .json({ error: "Mot de passe incorrect !" });
                }
                res.status(200).json({
                    userId: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    token: jwt.sign(
                        {
                            userId: user.id,
                        },
                        process.env.JWT_TOKEN,
                        { expiresIn: "24h" }
                    ),
                });
            });
        })
        .catch((error) => res.status(500).json({ error }));
};
exports.getUser = (req, res, next) => {
    //TO DO
};
exports.updateUser = (req, res, next) => {
    //TO DO
};
exports.deleteUser = (req, res, next) => {
    //TO DO
};
