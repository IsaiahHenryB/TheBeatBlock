// Adding dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
const session = require('express-session');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const passport = require('passport');


// Create app
const app = express();

// New middleware for data upload
app.use(bodyParser.json());

// requiring path
const path = require('path')
// Require routes
const routes = require('./routes/indexRoutes');
const conn = require('./config/connection');
// Create PORT
const PORT = process.env.PORT || 3000;
// Set view engine tp ejs
app.set('view engine', 'ejs');
// Securing proper file paths;
app.use(express.static(path.join(__dirname, 'public')));
// Morgan Middleware
app.use(morgan('combined'))
// Using method overrride
app.use(methodOverride('_method'))
// using url encoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)

require('./config/connection')
// Adding app.listen
app.listen(PORT, ()=>{
    console.log(`You are currently running from port${PORT}`)
})