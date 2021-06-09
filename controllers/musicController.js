const passport = require('passport');
const { req, res, response } = require('express');
const User = require('../models/userSchema');

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