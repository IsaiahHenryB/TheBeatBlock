const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const crypto = require('crypto');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

mongoose.connect(process.env.DB_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:  true,
    useFindAndModify: false,
    useCreateIndex: true} , (error) =>{
    if(error){
        console.log('There was an error')
    } else {
        console.log('This was a success')
    }
});

const conn = mongoose.createConnection(process.env.DB_URL,{ 
        useNewUrlParser: true,
        useUnifiedTopology:  true,
        useFindAndModify: false,
        useCreateIndex: true 
    });

let gfs;
conn.once('open',() =>{
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection('songs');
})

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
  } );
  const upload = multer({ storage });
  module.exports = upload;
