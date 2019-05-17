require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const sessions = require('express-session');
const PORT = process.env.PORT;
const MONGODB = process.env.MONGODB;


app.use(express.static('public'));
app.use(express.json());
app.use(sessions({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));


const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const houseController = require('./controllers/house.js');
app.use('/house', houseController);

const billsController = require('./controllers/bills.js');
app.use('/bills', billsController);

app.get('/splitit', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log("I'm listening...");
})

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true
});
mongoose.connection.once('open', ()=>{
    console.log('connected to mongo');
})
