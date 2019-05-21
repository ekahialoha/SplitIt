const express = require('express');
const bills = express.Router();

const Bills = require('../models/bills.js');
const House = require('../models/house.js');

const checkAuth = require('../middleware/checkauth.js');

//-- INDEX ROUTE --//
bills.get('/:id', (req, res) => {
	Bills.find({house: req.params.id}, (err, foundBill)=> {
		res.json(foundBill);
	});
});


//-- CREATE BILL ROUTE --//
bills.post('/', checkAuth, (req, res) => {
	Bills.create(req.body, (err, createdBill) => {
        res.json(createdBill);
		console.log(req.body);
    });
});

//-- EDIT BILL ROUTE --//
bills.put('/:id', (req, res)=> {
	Bills.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedBill) => {
		res.json(updatedBill);
	});
});

//-- DELETE BILL ROUTE --//
bills.delete('/:id', (req, res)=>{
	Bills.findByIdAndRemove(req.params.id, (err, deletedBill) => {
		res.json(deletedBill);
	});
});

module.exports = bills;
