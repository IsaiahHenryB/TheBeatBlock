const mongoose = require('mongoose');
const {Schema} = mongoose;

const songSchema = new Schema({
    username: {
      type: String,
    },
    title: {
      type: String,
    },
    collaborators: {
      type: String,
    },
    genre: {
      type: String,
    },
    description: {
      type: String,
    },
    file: {
      type: String,
    },
    fileid: {
      type: String,
    },
    filename: {
      type: String,
    },
  });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;