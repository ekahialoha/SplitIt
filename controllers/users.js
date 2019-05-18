const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../models/users.js');

const checkAuth = require('../middleware/checkauth.js');

// ================
// Registration
// ================
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Users.create(req.body, (err, createdUser) => {
        // We don't need the password for our purposes
        delete createdUser.password;

        req.session.user = createdUser;
        res.status(201).json({
            message: 'created',
            user: createdUser
        });
    });
});

// =========
// Login
// =========
router.post('/login', (req, res) => {
    Users.findOne({ username: req.body.username.toLowerCase() }, (err, foundUser) => {
        if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
            res.status(401).json({
                message: 'invalid'
            });
        } else {
            // We don't need the password for our purposes
            delete foundUser.password;

            req.session.user = foundUser;
            res.status(200).json({
                message: 'logged-in',
                user: foundUser
            });
        }
    });
});

// ==========
// Logout
// ==========
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({
            message: 'logged-out'
        });
    });
});

// ==================
// Validate Session
// ==================
router.get('/validate-auth', checkAuth, (req, res) => {
    res.status(200).json({
        message: 'logged-in',
        user: req.session.user
    });
});

module.exports = router;
