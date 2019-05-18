const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../models/users.js');

// ================
// Registration
// ================
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    Users.create(req.body, (err, createdUser) => {
        res.status(201).json({
            message: 'created'
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
router.get('/validate-auth', (req, res) => {
    if (req.session.user) {
        res.status(200).json({
            message: 'logged-in',
            user: req.session.user
        });
    } else {
        res.status(401).json({
            message: 'not-logged-in'
        });
    }
});

module.exports = router;
