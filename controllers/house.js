const express = require('express');
const houses = express.Router();

const House = require('../models/house.js');

const checkAuth = require('../middleware/checkauth.js')

//INDEX
houses.get('/', (req, res) => {
	House.find({}, (err, foundHouse)=> {
		res.json(foundHouse)
	});
});

houses.get('/', (req, res)=> {
	House.findById(req.session.user._id).populate('member').exec((err, user)=> {
		res.json({
			member: user.member 
		});
	})
});



//DELETE
houses.delete('/:id', (req, res)=>{
	House.findByIdAndRemove(req.params.id, (err, deletedHouse) => {
		res.json(deletedHouse);
	});
});

//CREATE
houses.post('/', checkAuth, (req, res) => {
	House.create({
		name: req.body.name,
		owner: req.session.user._id
	}, (err, createdHouse) => {
		if(err) {
			res.status(500).json(err);
		} else {
			res.json(createdHouse);
		}
	});
});

//EDIT
houses.put('/:id', (req, res)=> {
	House.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedHouse) => {
		res.json(updatedHouse);
	});
});

module.exports = houses;
