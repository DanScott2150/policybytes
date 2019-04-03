// Establishes connection to PostgreSQL database

const pg = require('pg');     // https://github.com/brianc/node-pg-pool
const url = require('url');   // https://nodejs.org/api/url.html

let config = {};

// For Heroku deployment, set environment variable DATABASE_URL to point at psql database
// If DATABASE_URL not found, config will default to localhost 

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object. Need to parse URL
  const params = url.parse(process.env.DATABASE_URL);

  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
} else {
  // If DATABASE_URL not set, set config to localhost:
  config = {
    host: 'localhost', 
    port: 5432,
    database: 'policybytes',
    user: 'postgres',
    password: 'asdf',
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

const pool = new pg.Pool(config);

// Confirm that pool connection has been created
pool.on('connect', () => {
  console.log('/server/pool.js -- Pool connected to host: ', config.host);
});

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;