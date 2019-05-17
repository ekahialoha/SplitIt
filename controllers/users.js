const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../models/users.js');

// ================
// Registration
// ================
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.status(201).json({
            message: 'created'
        });
    });
});

// =========
// Login
// =========
router.post('/login', (req, res)=>{
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
            res.status(401).json({
                message: 'invalid'
            });
        } else {
            req.session.user = foundUser;
            res.status(200).json({
                message: 'logged-in'
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
