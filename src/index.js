const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
dotenv.config();

// databae 
const db = require('./config/database/database.config');
db.connect();


server.listen(PORT, (req, res) => {
    console.log(`listening http://localhost:${PORT}`);
})