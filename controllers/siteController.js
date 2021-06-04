const passport = require('passport');
const { req, res, response } = require('express');
const User = require('../models/userSchema');

module.exports = {
    home: (req, res) =>{
        res.render('pages/index',{user: req.user})
    },
    about: (req, res) =>{
        res.render('pages/about')
    },
    music: (req, res) =>{
        res.render('pages/music')
    },
    upload: (req, res) =>{
        res.render('pages/submit')
    },
    blog: (req, res) =>{
        res.render('pages/blog')
    },
    login: (req, res) =>{
        res.render('pages/login')
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
                res.redirect('/');
              });
            }
          });
    },
    signup: (req, res) =>{
        res.render('pages/signup')
    },
    signup_post: (req, res) =>{
        User.register({
            username: req.body.username,
            genre: req.body.genre,
            email: req.body.email,
            occupation: req.body.occupation,
            description: req.body.description,
        } , req.body.password, (error,user)=>{
          if (error){
            console.log(error);
            res.redirect('/signup');
          } else {
            passport.authenticate('local')(req, res, ()=>{
              res.redirect('/login')
            });
          }
        });
      },
}