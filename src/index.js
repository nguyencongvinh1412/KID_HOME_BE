const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3010;
const cors = require('cors');

// import routes
const  authRoute = require('./resources/routers/auth.route');

dotenv.config();

// middlewares
app.use(cors());

// databae 
const db = require('./config/database/database.config');
db.connect();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// use routes
app.use('/auth', authRoute);

server.listen(PORT, (req, res) => {
    console.log(`listening http://localhost:${PORT}`);
})