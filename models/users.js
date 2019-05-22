const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, lowercase: true, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    profilePicture: String
});

const Users = mongoose.model('User', userSchema);

module.exports = Users;
