const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3010;
const cors = require('cors');
const originDomain = process.env.ORIGIN_DOMAIN || 'http://localhost:';
const cloudinary = require('./config/cloudinary/cloudinary');

// import routes
const  authRoute = require('./resources/routers/auth.route');
const addressRoute = require("./resources/routers/address.route");
const cloudinaryRoute = require('./resources/routers/cloudinary.route');
const centreRoute = require('./resources/routers/centre.route');
const mockDataRoute = require('./resources/routers/mock_data.route');

dotenv.config();

// middlewares
app.use(cors());

// databae 
const db = require('./config/database/database.config');
db.connect();

app.use(express.json({limit: '1gb'})) // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: '1gb' })) // for parsing application/x-www-form-urlencoded

// use routes
app.use('/auth', authRoute);
app.use('/address', addressRoute);
app.use('/cloudinary', cloudinaryRoute);
app.use('/centres', centreRoute);
app.use('/mock-data', mockDataRoute);

server.listen(PORT, (req, res) => {
    console.log(`listening ${originDomain}${PORT}`);
})