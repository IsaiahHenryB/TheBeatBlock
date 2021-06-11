const passport = require('passport');
const { req, res, response } = require('express');
const User = require('../models/userSchema');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')
const Song = require('../models/songSchema');
const connect = require('../config/connection');

const mongoURI = process.env.DB_URL;

const conn = mongoose.createConnection(mongoURI)

let gfs

conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('songs')
})
// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DB_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'songs'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
module.exports = {
    home: (req, res) =>{
        res.render('pages/index',{user: req.user})
    },
    about: (req, res) =>{
        res.render('pages/about',{user: req.user})
    },
    music: (req, res) =>{
      Song.find({},(error, allsongs) =>{
        res.render('pages/music', {
          user: req.user,
          songs: allsongs,
        })
      })
  },
    upload: (req, res) =>{
        if(req.isAuthenticated()){
          res.render('pages/submit',{user: req.user});
        } else {
          res.redirect('/music/login')
        }
        
    },
    upload_post: (req, res) =>{
      upload.single('song'),
      res.json({song: req.song})
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