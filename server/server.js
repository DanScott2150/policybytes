// PolicyBytes Server

// Need to configure based on whether server is running on localhost for development,
// or a live production deployment. Comment in/out lines at bottom of file accordingly

// Basic config
const express = require('express');
require('dotenv').config();

// const https = require('https');
// const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');
const passportFacebook = require('./strategies/facebook.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const facebookRouter = require('./routes/facebook.router');
const topicRouter = require('./routes/topic.router')
const commentsRouter = require('./routes/comments.router')
const likesRouter = require('./routes/likes.router');
const landingPageRouter = require('./routes/landingpage.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(passportFacebook.initialize());
app.use(passportFacebook.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/facebook', facebookRouter);
app.use('/api/topic', topicRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/likes', likesRouter);
app.use('/api/landingpage', landingPageRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;



// START of localhost development configuration
// Configures to use HTTPS on localhost
// Can comment out the following block for production
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