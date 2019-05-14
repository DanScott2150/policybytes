// PolicyBytes Server

// Need to configure based on whether server is running on localhost for development,
// or a live production deployment. Comment in/out lines at bottom of file accordingly

// Basic config
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static('build'));

// Body parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session Middleware - keeps user logged in throughout session
const sessionMiddleware = require('./modules/session-middleware');
app.use(sessionMiddleware);

// App routes
const userRouter = require('./routes/user.router'),
      facebookRouter = require('./routes/facebook.router'),
      topicRouter = require('./routes/topic.router'),
      commentsRouter = require('./routes/comments.router'),
      likesRouter = require('./routes/likes.router'),
      landingPageRouter = require('./routes/landingpage.router');

app.use('/api/user', userRouter);
app.use('/api/facebook', facebookRouter);
app.use('/api/topic', topicRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/landingpage', landingPageRouter);

// Passport Session Configuration
const passport = require('./strategies/user.strategy');
const passportFacebook = require('./strategies/facebook.strategy');
app.use(passport.initialize());
app.use(passport.session());
app.use(passportFacebook.initialize());
app.use(passportFacebook.session());


// START of localhost development configuration
// Configures to use HTTPS on localhost
// Comment out the following block for production
// ----------------------------->
    const https = require('https');     // https://nodejs.org/api/https.html
    const fs = require('fs');

    var options = {
      key: fs.readFileSync( './localhost.key' ),
      cert: fs.readFileSync( './localhost.cert' ),
      requestCert: false,
      rejectUnauthorized: false
    };

    var server = https.createServer( options, app );

    server.listen(PORT, () => {
      console.log(`DEVELOPMENT server listening on port: ${PORT}`);
    });
// <------------------------------
// END of localhost configuration

// START of production configuration, for when deployed to heroku
// ----------------------------->
      // app.listen(PORT, () => {
      //   console.log(`PRODUCTION server listening on port: ${PORT}`);
      // }); 
// <------------------------------
// END of heroku configuration