const passport = require('passport');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const User = require('../models/userSchema');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose')
const Song = require('../models/songSchema');
const connect = require('../config/connection');

const mongoURI = process.env.DB_URL;

const conn = mongoose.createConnection(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology:  true,
  useFindAndModify: false,
  useCreateIndex: true
})

let gfs
let gridFSBucket
conn.once('open', ()=>{
  gfs = Grid(conn.db, mongoose.mongo);
  gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'songs'
  });
  gfs.collection('songs')
})
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

music_player: (req, res) => {
  const readstream = gfs.createReadStream({filename: req.params.filename})
  readstream.on('error', function (error) {
       res.sendStatus(500)
  })
  res.type('audio/mpeg')
  readstream.pipe(res)
},
}