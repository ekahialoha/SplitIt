const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const Users = require('../models/users.js');

const checkAuth = require('../middleware/checkauth.js');

// ================
// Registration
// ================
router.post('/', (req, res) => {
    Users.findOne({ username: req.body.username.toLowerCase() }, (err, usernameCheck) => {
        if (usernameCheck) {
            res.status(400).json({ message: 'username-taken' });
        } else {
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
        }
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

// ==================
// User Management
// ==================
router.put('/', checkAuth, (req, res) => {
    Users.findById(req.session.user._id, (err, foundUser) => {
        if (!bcrypt.compareSync(req.body.currentPassword, foundUser.password)) {
            res.status(401).json({
                message: 'invalid'
            });
        } else {
            if (req.body.password) {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
            }
            console.log(req.body);
            Users.findByIdAndUpdate(foundUser._id, req.body, { new: true }, (err, updatedUser) => {
                // We don't need the password for our purposes
                delete updatedUser.password;

                req.session.user = updatedUser;
                res.status(200).json({
                    message: 'updated-user',
                    user: updatedUser
                });
            });
        }
    });
});

// ==================
// User List
// ==================
router.get('/', checkAuth, (req, res) => {
    Users.find({}, {name: 1, username: 1}, (err, users) => {
        res.json(users);
    });
});

module.exports = router;
