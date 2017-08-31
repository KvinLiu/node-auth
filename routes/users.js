const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads'});

const {User} = require('../models/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) => {
  res.render('register', {title: 'Register'});
});

router.get('/login', (req, res) => {
  res.render('login', {title: 'Login'});
});

router.post('/register', upload.single('profileimage'), (req, res) => {
  const name = req.body.name,
    email = req.body.email,
    username = req.body.username,
    password = req.body.password,
    password2 = req.body.password2;

  if (req.file) {
    console.log('Uploading File...');
    let profileimage = req.file.filename;
  } else {
    console.log('No File Uploaded...');
    let profileimage = 'noimage.jpg';
  }

  // Form validator
  req.checkBody('name', 'Name field is required').notEmpty();

  // Check Errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors
    })
  } else {
    let newUser = new User({
      name,
      email,
      username,
      password,
      profileimage
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user);
    });

    res.location('/');
    res.redirect('/')
  }
});

module.exports = router;
