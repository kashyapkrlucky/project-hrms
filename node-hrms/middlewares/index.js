const bodyParser = require('body-parser');
const morgan = require('morgan');
const colors = require('colors');
const express = require('express');

// Route Definition
const employee = require('../routes/employee');
const company = require('../routes/company');
const recruitment = require('../routes/recruitment');
const job = require('../routes/job');
const task = require('../routes/task');
const leave = require('../routes/leave');

// URL encoding, statics, morgan, logger & body parser middleware
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(morgan(colors.cyan(':method :url :status HTTP/:http-version :res[content-length] :remote-addr - :response-time ms')));

    app.use(express.static('public'));
    // Global Middleware like Origin, Method, Headers, Credentials
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    // Routes
    app.use('/api/employee', employee);
    app.use('/api/company', company);
    app.use('/api/recruitment', recruitment);
    app.use('/api/job', job);
    app.use('/api/task', task);
    app.use('/api/leave', leave);
}
