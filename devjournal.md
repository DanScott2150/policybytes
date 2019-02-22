### 2.08

Downloaded source code from github: https://github.com/davidthekesler/policybytes
Working on getting local dev environment setup
Downloaded & installed PostgresQL
npm install for dependences: ran into a problem with bcrypt. Needed to to an npm global install
for node-pre-gyp(?), and to do that I first had to go into windows powershell and install something
else.
Ran into issue with local HTTPS. Was able to create a local certificate (i think), but still running into issues. For now, just disabled 'HTTPS=true' from npm run client script

- Was able to get app running, however with no content. Need to set up Postgres DB with data.



### reset 2.19

Prior attempts to get dev version working failed. Felt like I was spinning my wheels. Deleted everything and decided to start fresh.

Re-downloaded github repo.
Deleted all prior psql databases, created a new 'policybytes' db, based on included dbexport.
Set up local .env file: updated relevant values
npm install: ran into same problem with bcrypt package. Forgot how I resolved the issue last time

Had to make change to package.json:
    - npm scripts:
        run client: "set HTTPS=true&&react-scripts start"   [change for Windows]

Generate SSLs localhost.key & localhost.cert: via OpenSSL program for Windows, was able to copy/paste a command
line code from google that setup these two files, which allow for https on localhost.




To Do's:
        - Edit banner content (i.e. Citizens League info)
                => <LandingJumbotron> in LandingPage.jsx

        - Images
                => Should just need to set up new filestack account & get new credentials
                => Read into filestack more. Overkill for what we need?

        - Auto-linking in text boxes
                => Libraries to accomplish this:
                        - https://alexcorvi.github.io/anchorme.js/
                        - https://soapbox.github.io/linkifyjs/
        - Specific URLs
        - Admin page in general
        - 'Love' functionality [lower priority]



FileStack
danscott2150@gmail.com
EDir20m!