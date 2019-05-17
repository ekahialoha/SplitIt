const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const houseSchema = new mongoose.Schema({
	name: {type: String, required: true},
	owner: {type: Schema.Types.ObjectId, ref: 'User', required: true },
	members: [{type: Schema.Types.ObjectId, ref: 'User', default:[] }]

});

const House = mongoose.model('House', houseSchema);

module.exports = House;
