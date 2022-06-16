const bcryptjs = require('bcryptjs');
const models = require('../models/Index');
const jwt = require('jsonwebtoken');
const passwordValidator = require('../middleware/passwordValidator');
const emailValidator = require('email-validator');

// Create Account
exports.signup = (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.password === "" || req.body.password2 === "" || req.body.role === "" || req.body.roleNumber === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    // Bad Schema Password
    if (!passwordValidator.validate(req.body.password)) {
        return res.status(400).json({ message: "Mot de Passe invalide : Veuillez utiliser entre 8 et 30 caractères avec au minimum 1 Majuscule, 1 Minuscule et 1 Chiffre" });
    }
    // Different Password
    if (req.body.password !== req.body.password2) {
        return res.status(400).json({ message: "Les mots de passe ne sont pas identiques" });
    }
    models.Users.findOne({
        where: { email: req.body.email}
    })
    .then((user) => {
        if(!user) {
            bcryptjs.hash(req.body.password, 10)
                .then(hash => {
                    models.Users.create({
                        email: req.body.email,
                        password: hash,
                        role: req.body.role,
                        roleNumber: req.body.roleNumber
                    })
                    .then((user) => res.status(201).json({ user }))
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        } else {
            return res.status(400).json({ message: "Cet email existe déjà, merci d'en choisir un autre"});
        }
    })
    
};

// Login
exports.login = (req, res) => {
    // Empty Inputs
    if (req.body.email === "" || req.body.password === "") {
        return res.status(400).json({ message: "Merci de renseigner tous les Champs Obligatoires"});
    }
    // Bad Schema Mail
    if (!emailValidator.validate(req.body.email)) {
        return res.status(400).json({ message: "Format d'email invalide" });
    }
    models.Users.findOne({where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcryptjs.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24H' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};