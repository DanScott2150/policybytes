/public > index.html (bootstrap, fontawesome, google fonts) 

npm run server >> launches server/server.js

bodyparser - https://medium.com/@adamzerner/how-bodyparser-works-247897a93b90


-- Localhost configuration:
Sets up the server to use HTTPS when on localhost. When deployed and live, comment out this section.
This also requires "npm run client" in package.json to include "set HTTPS=true" (had to tweak this slightly to deal with windows?)

localhost.cert & localhost.key files


-- Middleware
Currently only middleware is cookie-session. This sets up cookies to keep user logged in throughout their session.
Utilizes a SECRET set via .env, and returns a warning message if it's not set or is something shorter than 8 characters.

Warning message was previously broken out into it's own file: /server/constants/warnings.js. Seems unnecessary for just one single thing, so just incorporated it directly into session-middleware.js

-- Pool
Sets up a 'pool' connection to the PostgreSQL database. There are two possible configurations handled here, one for localhost development and one for heroku deployment. Checks to see if DATABASE_URL is set as a .env variable (it should be for heroku, not for localhost). If it's set, it will parse the database URL and configure the pool connection. Otherwise, it will configure based on localhost settings. These need to be manually updated if changes are made to the localhost psql setup.

https://node-postgres.com/features/pooling

-- Routes
-Topic routes
    - Sets up API endpoints for fetching all topics. Creates variable containing SQL query code, then passes into pool object. Returned data stored in result.rows, which then gets passed to res.send().
    - On client side, redux saga hits this endpoint, then results.rows gets passed to the new state

    - Landing page routes: Featured topic & archived topics

    - post routes
        https://node-postgres.com/features/transactions


    - Revisit: Proposals as separate tables in db? Also, re-name proposal to 'thesis' or something?
    - Key Claims: rename to 'thread' or something?
    - Need to use separate 'queryText#' var names?

    - Why is delete route set up slightly different? Passes topic ID in directly to the route in node, rather than using redux? Then accesses topicId via req.params.id rather than req.body.id


npm run client >> launches index.js




Deployment to Heroku:
server/server.js - comment lines in/out for server config
package.json: scripts-client: "set HTTPS=true&&"react-scripts start
npm run build
git master push
heroku dashboard > deploy from github



https://devcenter.heroku.com/articles/heroku-postgresql

Heroku CLI
$ heroku login  [prompt login via browser page]
$ heroku pg:psql


Connect to database:
heroku pg:psql postgresql-crystalline-80137 --app policybytes-beta


heroku pg:pull HEROKU_POSTGRESQL_MAGENTA mylocaldb --app sushi