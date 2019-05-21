const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billsSchema = new mongoose.Schema({
    title: {type: String, required: true},
    total: {type: Number, required: true},
    dueDate: {type: Date, required: true},
    hasPaid: [{type: Schema.Types.ObjectId, default:[] }],
    house: {type: Schema.Types.ObjectId, ref: 'House' }
})

const Bills = mongoose.model('Bill', billsSchema);
module.exports = Bills;
