const passport = require('passport');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const User = require('../models/userSchema');
const Song = require('../models/songSchema');

module.exports = {
login: (req, res) =>{
    res.render('pages/musiclogin',{user: req.user})
},
login_post: (req, res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
      });
    
      req.login(user, (error) => {
        if (error) {
          return error;
        } else {
          passport.authenticate('local')(req, res, () => {
            res.redirect('/upload');
          });
        }
      });
},
}