const mongoose = require('mongoose');

const url = process.env.DB_URL;
const connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology:  true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Initialize GridFs stream
let gfs;

// Initialize stream
connect.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "songs"
  });
});

mongoose.connect(process.env.DB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology:  true,
  useFindAndModify: false,
  useCreateIndex: true
}, (error) =>{
    if(error){
        console.log('There was an error')
    } else {
        console.log('This was a success')
    }
});

  // module.exports = upload;