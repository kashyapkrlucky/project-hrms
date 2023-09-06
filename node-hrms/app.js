require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const colors = require('colors');
const cors = require('cors');

// express app defintion
const app = express();
app.use(cors());

// Setting database
require('./database');

// Setting middleware
require('./middlewares')(app);

// listening app
app.listen(PORT, () => {
    console.log(colors.cyan(`Server is running on PORT ${PORT}`));
});




