const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// mongodb://localhost/books
mongoose.connect('mongodb://ranand16:ranand16@ds135255.mlab.com:35255/books', {useNewUrlParser: true, useCreateIndex: true})
.catch(error=>{
    console.log("there was an error while connectinng to mongo db.");
    console.log("error \n");
    console.log(error);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

// all the workable routes
app.use('/bookapi', bookRoutes);
app.use('/userapi', userRoutes);

module.exports = app;
