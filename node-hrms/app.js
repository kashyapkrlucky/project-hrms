require('dotenv').config();
const PORT = process.env.PORT || 4000;
const express = require('express');
const colors = require('colors');
const cors = require('cors');

// express app defintion
const app = express();

// Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3000']
  }
});

app.use(cors());

// Setting database
require('./database');

// Setting middleware
require('./middlewares')(app);

// Setting IOs
require('./chats')(io);

// listening app
http.listen(PORT, () => {
  console.log(colors.cyan(`Server is running on PORT ${PORT}`));
});




