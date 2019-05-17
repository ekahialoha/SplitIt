const express = require('express');
const bills = express.Router();

const Bills = require('../models/bills.js');


//-- INDEX ROUTE --//
bills.get('/', (req, res) => {
	Bills.find({}, (err, foundBill)=> {
		res.json(foundBill);
	});
});

//-- CREATE BILL ROUTE --//
bills.post('/', (req, res) => {
	Bills.create(req.body, (err, createdBill) => {
        res.json(createdBill);
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
