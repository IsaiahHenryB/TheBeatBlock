const mongoose = require('mongoose');
const {Schema} = mongoose;
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    genre: {
      type: String,
    },
    occupation: {
      type: String,
    },
    description: {
      type: String,
    },
  });

  
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema)

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;