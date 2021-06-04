const passport = require('passport');
const { req, res, response } = require('express');
const User = require('../models/userSchema');

module.exports = {
    home: (req, res) =>{
        res.render('pages/index',{user: req.user})
    },
    about: (req, res) =>{
        res.render('pages/about',{user: req.user})
    },
    music: (req, res) =>{
        res.render('pages/music',{user: req.user})
    },
    upload: (req, res) =>{
        if(req.isAuthenticated()){
          res.render('pages/submit',{user: req.user});
        } else {
          res.redirect('/login')
        }
        
    },
    blog: (req, res) =>{
        res.render('pages/blog',{user: req.user})
    },
    login: (req, res) =>{
        res.render('pages/login',{user: req.user})
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
        res.render('pages/signup',{user: req.user})
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
    logout: (req, res) =>{
      req.logout();
      res.redirect('/')
    }
}