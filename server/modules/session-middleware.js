// Session Middleware: Keeps user logged in throughout their session

const cookieSession = require('cookie-session');      // https://www.npmjs.com/package/cookie-session

/*
  The cookie session makes it so a user can enter their username and password one time,
  and then we can keep them logged in. We do this by giving them a really long random string
  that the browser will pass back to us with every single request. The long random string is
  something the server can confirm, and then we know that we have the right user.

  You can see this string that gets passed back and forth in the
  `application` ->  `storage` -> `cookies` section of the chrome debugger
*/

const serverSessionSecret = () => {
  if (!process.env.SERVER_SESSION_SECRET ||
      process.env.SERVER_SESSION_SECRET.length < 8 ) {
    // Warning if user doesn't have a good secret
    
    const badSecretWarning = `
      ----------------------------
      *** WARNING ***
      Your application is not very secure.
      You need to set SERVER_SESSION_SECRET to a better secret
      Please follow the README and add a .env file
      
      It should be longer than 8 characters
      
      If this warning is showing on Heroku,
      add or change your SERVER_SESSION_SECRET environment variable!
      ----------------------------`;

    console.log(badSecretWarning);
  }

  return process.env.SERVER_SESSION_SECRET;
};

module.exports = cookieSession({
  secret: serverSessionSecret() || 'secret', // set this in .env file
  key: 'user', // this is the name of the req.variable. 'user' is convention, but not required
  resave: 'false',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
});
