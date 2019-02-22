const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const pool = require('../modules/pool.js');

let debug = true;   
if (debug) { 
  console.log('in facebook strategy');
}
let cbUrl;
if(process.env.DEV == 'true'){
  cbUrl = process.env.LOCALHOST_REDIRECT_URL
  console.log(cbUrl);
} else {
  cbUrl = process.env.DEPLOY_REDIRECT_URL
  console.log(cbUrl);
}

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: cbUrl,
    profileFields: ['id', 'displayName', 'first_name', 'last_name', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    if(debug){
      console.log('Facebook profile', profile);
      console.log('Facebook photo[0]', profile.photos[0].value);
      console.log('Facebook email[0]', profile.emails[0].value);
    };

    pool.query('SELECT * FROM person WHERE fb_id = $1;', [profile.id]).then((result) => {
      if(result.rows.length === 0) {
        //values from Facebook are inserted into database.
        // NOTE user is instantiated with a status int 1 in the database. int 2 is admin access.
        pool.query('INSERT INTO person (fb_display_name, fb_id, fb_picture, email, first_name, last_name, status) VALUES ($1, $2, $3, $4, $5, $6, $7);',
                    [profile.displayName, profile.id, profile.photos[0].value, profile.emails[0].value, profile.name.givenName, profile.name.familyName, 1])
          .then((result) => {
            if(debug){console.log('registered new user');};

            pool.query('SELECT * FROM person WHERE fb_id = $1;', [profile.id]).then((result) => {
              if(result.rows.length === 0) {
                done(null, false);
              } else {
                let foundUser = result.rows[0];
                if(debug){console.log('found user', foundUser);};
                done(null, foundUser);
              }
            }).catch((err) => {
              done(null, false);
            })
          })
          .catch((err) => {
            if(debug){console.log('error in new user post', err);};
            done(null, false);
          })
      } else {

        let foundUser = result.rows[0];
        if(debug){console.log('found user', foundUser);};
        done(null, foundUser);
      }
    }).catch((err) => {
      if(debug){console.log('error in new user post', err);};
      response.sendStatus(500);
      done(null, false);
    })
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    pool.query("SELECT * FROM person WHERE id = $1", [id], function(err, result) {
      // Handle Errors
      if(err) {
        console.log('query err ', err);
        done(err);
      }
      user = result.rows[0];
      if(!user) {
          // user not found
          return done(null, false, {message: 'Incorrect credentials.'});
      } else {
        // user found
        done(null, user);
      }
    });
});

module.exports = passport;