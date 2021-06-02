const passport = require('passport');
const { request, response } = require('express');

module.exports = {
    home: (req, res) =>{
        res.render('pages/index')
    },
    about: (req, res) =>{
        res.render('pages/about')
    },
    music: (req, res) =>{
        res.render('pages/music')
    },
    upload: (req, res) =>{
        res.render('pages/aubmit')
    },
    blog: (req, res) =>{
        res.render('pages/blog')
    },
    login: (req, res) =>{
        res.render('pages/login')
    },
    signup: (req, res) =>{
        res.render('pages/signup')
    },
}