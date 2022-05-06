//----------------Déclarations et importations------------------
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const models = require("../models/");

//----------------Logique métier--------------------------------

exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            models.User.create({
                email: req.body.email,
                username: req.body.username,
                password: hash,
                isAdmin: 0,
            });
        })
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
exports.login = (req, res, next) => {
    //TO DO
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
