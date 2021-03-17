const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const mongoose = require('mongoose');
const User = require('../models/User'); 


passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await User.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Not User found.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect Password.' });
    }
  }

}));



passport.use(new GoogleStrategy({
 //clientID: process.env.G_clientID,
  clientID: '742837743199-s9c22ufg5p7i5vj1592p1d6f25k54hjl.apps.googleusercontent.com',
 // clientSecret:process.env.G_clientSecret,
 clientSecret:'T3Z-RtKFt-_zLNHgXCcoislh',
  callbackURL: "https://pogopopweb.herokuapp.com/auth/google/callback",
  proxy: true ,
  profileFields: ['_id', 'displayName', 'name','email'],

},
function(token, refreshToken, profile, done) { 

  // asynchronous
  process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'uid' : profile._id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
              return done(err);

          // if the user is found, then log them in
          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); // user found, return that user
          } else {
              // if there is no user found with that facebook id, create them
              var newUser            = new User();

              // set all of the facebook information in our user model
              newUser.uid    = profile._id; // set the users facebook id                   
              newUser.token = token; // we will save the token that facebook provides to the user                    
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              // save our user to the database
              newUser.save(function(err) {
                  if (err)
                      throw err;

                  // if successful, return the new user
                  return done(null, newUser);
              });
          }

      });

  })

}));




passport.use(new facebookStrategy({

  // pull in our app id and secret from our auth.js file
  //clientID        : process.env.F_clientID,
  //clientSecret    : process.env.F_clientSecret,
  clientID        : '228902038713923',
  clientSecret    : 'b7922533a7e4a4e6c158a20142734f11',
  callbackURL     : "https://pogopopweb.herokuapp.com/facebook/callback",
  profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

  // asynchronous
  process.nextTick(function() {

      // find the user in the database based on their facebook id
      User.findOne({ 'uid' : profile.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err)
              return done(err);

          // if the user is found, then log them in
          if (user) {
              console.log("user found")
              console.log(user)
              return done(null, user); // user found, return that user
          } else {
              // if there is no user found with that facebook id, create them
              var newUser            = new User();

              // set all of the facebook information in our user model
            //  newUser.uid    = profile.id; // set the users facebook id                   
              newUser.token = token; // we will save the token that facebook provides to the user                    
              newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
              newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
              // newUser.gender = profile.gender
              // newUser.pic = profile.photos[0].value
              // save our user to the database
              newUser.save(function(err) {
                  if (err)
                      throw err;

                  // if successful, return the new user
                  return done(null, newUser);
              });
          }

      });

  })

}));











passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
