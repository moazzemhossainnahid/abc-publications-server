const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const colors = require("colors");
const mongoose = require('mongoose');
require('dotenv').config();
const multer  = require('multer');


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.json());


// import routes
const usersRoute = require('./v1/Routes/users.route');
const postsRoute = require('./v1/Routes/posts.route');




// declare routes
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/posts', postsRoute);




app.get("/", (req, res) => {
    try {
        res.send("Welcome to ABC Productions Server");
    } catch (error) {
        console.log(error.message);
    };
});

app.all("*", (req, res) => {
    try {
        res.send("No Routes Found");
    } catch (error) {
        console.log(error.message);
    };
});


app.listen(PORT, () => {
    try {
        console.log(`server is successfully running on port ${PORT}!`.white.bold);
    } catch (error) {
        console.log(error.message);
    };
});

exports = app;