const passport = require('passport');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const User = require('../models/userSchema');
const Song = require('../models/songSchema');
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
        Song.find({},(error, allSongs)=>{
          if(error){
            return error
          } else {
            // gfs.openDownloadStream(req.params.filename).pipe(res);
            res.render('pages/music', {
              user: req.user,
              songs: allSongs,
            })
          }
        });
      },

        
    upload: (req, res) =>{
        if(req.isAuthenticated()){
          res.render('pages/submit',{user: req.user});
        } else {
          res.redirect('/music/login')
        }
        
    },
    upload_post: [
      upload.single('file'), (req, res, next) => {
        console.log(req.body);
        // check for existing songs
        Song.findOne({title: req.body.title})
          .then((song) => {
            if(song) {
              return res.status(200).json({
                success:false,
                message: 'Song already exists'
              });
            }

            let newSong = new Song({
              username: req.body.username,
              title: req.body.title,
              genre: req.body.genre,
              description: req.body.description,
              file: req.body.file,
              fileid: req.file.id,
              filename: req.file.filename,
            });

            newSong.save()
              .then((song) => {
                res.status(200).json({
                  success: true,
                  song
                });
              })
              .catch(err => res.status(500).json(err));
          })
          .catch(err => res.status(500).json(err));
          res.redirect('/music');
      }
    ],
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
      console.log(req.body)
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