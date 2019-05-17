const express = require('express');
const houses = express.Router();

const House = require('../models/house.js');

//INDEX
houses.get('/', (req, res) => {
	House.find({}, (err, foundHouse)=> {
		res.json(foundHouse)
	});
});

//DELETE
houses.delete('/:id', (req, res)=>{
	House.findByIdAndRemove(req.params.id, (err, deletedHouse) => {
		res.json(deletedHouse);
	});
});

//CREATE
houses.post('/', (req, res) => {
	House.create(req.body, (err, createdHouse) => {
		res.json(createdHouse);
	});
});

//EDIT 
houses.put('/:id', (req, res)=> {
	House.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedHouse) => {
		res.json(updatedHouse);
	});
});

module.exports = houses;