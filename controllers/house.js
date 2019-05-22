const express = require('express');
const houses = express.Router();

const House = require('../models/house.js');

const checkAuth = require('../middleware/checkauth.js')

//INDEX
houses.get('/', (req, res) => {
	House.findOne({ $or: [
		{owner: req.session.user._id},
		{member: {$in: [req.session.user._id]}}
	]}).populate('member').populate('owner').exec((err, foundHouse)=> {
		res.json(foundHouse)
	});
});

//DELETE

houses.delete('/:id/member/:userId', (req, res)=> {
	House.findById(req.params.id, (err, foundHouse) => {
		console.log(foundHouse.member)
		console.log(req.params.userId)
		foundHouse.member = foundHouse.member.filter((existing)=> {
			return existing.toString() !== req.params.userId;
		});
		foundHouse.save((err, updatedHouse)=> {
			res.json(updatedHouse);
		});
	});
});

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

houses.put('/member/:id', (req, res)=> {
	House.findById(req.params.id, (err, foundHouse) => {
		foundHouse.member.push(req.body.member)
		foundHouse.save((err, updatedHouse)=>{
			res.json(updatedHouse)
		});
	});
});

module.exports = houses;
