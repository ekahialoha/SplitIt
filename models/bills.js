const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    total: {type: Number, required: true},
    dueDate: {type: Date, required: true},
    roommates: [{type: Schema.Types.ObjectId, ref: 'User', default:[] }],
    house: [{type: Schema.Types.ObjectId, ref: 'House', default:[] }] 
})

const Bills = mongoose.model('Bill', billsSchema);
module.exports = Bills;
