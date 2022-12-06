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
const userRoute = require("./resources/routers/user.route");
const roleRoute = require("./resources/routers/role.route");
const blogRoute = require("./resources/routers/blog.route");
const commentRoute = require("./resources/routers/comment.route");
const ratingRoute = require("./resources/routers/rating.route");
const serviceTypeRoute = require("./resources/routers/serviceType.route");
const applicationRoute = require("./resources/routers/application.route");

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
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/blogs', blogRoute);
app.use('/comments', commentRoute);
app.use('/ratings', ratingRoute);
app.use('/service-type', serviceTypeRoute);
app.use("/application", applicationRoute);

server.listen(PORT, (req, res) => {
    console.log(`listening ${originDomain}${PORT}`);
})