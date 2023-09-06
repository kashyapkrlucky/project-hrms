const mongoose = require('mongoose');
const colors = require('colors');
const { DB_NAME, DB_USER, DB_PASS } = process.env;
const pass = Buffer.from(DB_PASS, "base64").toString("ascii");
const serverUrl = `mongodb+srv://${DB_USER}:${pass}@learning.izq27nc.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(serverUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log(colors.brightGreen('Connected to MongoDB'));
}).catch(err => {
    console.log(colors.red('Error in connection', err));
})