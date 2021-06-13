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

const conn = mongoose.createConnection(mongoURI,{
  useNewUrlParser: true,
  useUnifiedTopology:  true,
  useFindAndModify: false,
  useCreateIndex: true
})

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
      const user = req.user.username;
        if(req.isAuthenticated()){
            Song.find({username: user},(error, allsongs) =>{
              res.render('pages/manager', {
                user: req.user,
                songs: allsongs,
              })
            })
        } else {
          res.redirect('/login')
        }
    },
    update_song_put: (req, res) =>{
      const id = req.params.id;
     Song.findByIdAndUpdate({_id: id}, {$set: {
      username: req.body.username,
      title: req.body.title,
      collaborators: req.body.collaborators,
      genre: req.body.genre,
      description: req.body.description,
      }}, {new: true}, (error) => {
          if(error){
              return error;
          } else {
              res.redirect('/:user/songs');
          }
      }) 
  },
  update_song_get: (req, res) =>{
    const id  = req.params.id;
    Song.findOne({ _id: id},(error, thisSong) => {
        if(req.isAuthenticated()){
            res.render('pages/update',{ song: thisSong, user: req.user })
        } else {
            res.redirect('/login')
        }
    });
},
song_file_delete: (req, res) =>  {
  const songid = req.body.songid
  gfs.remove({ _id: req.params.id, root: 'songs'}, (err, gridStore) => {
    if(err){
      return error;
    }
  });
  
  res.render('pages/delete' , {user:req.user,songid:songid})
},
song_delete: (req, res) =>  {
  
  const id = req.params.id;

        Song.deleteOne({_id: id}, (error) =>{
            if(error){
                return error;
            } else {
                res.redirect('/:user/songs');
            }
        })
},
}