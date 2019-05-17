const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    total: {type: Number, required: true},
    dueDate: {type: Date, required: true},
    usersModel: {type: Schema}//additional assistance required for connecting to users
})

const Bills = mongoose.model('Bill', billsSchema);
module.exports = Bills;
