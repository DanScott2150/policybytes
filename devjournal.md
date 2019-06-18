
## 5.29.19
- Admin Edit Topic Page: Add & Delete Key Claim, Add & Delete Stream Items now functional.

## 5.20.19
V 1.0
Sitewide
- Major design updates to try and make everything cleaner & more intuitive. Also resulted in cleaner code which will be easier to update going forward. Major changes to the Landing Page, Topic Page, Admin Panel, and Topic Edit Page.

Known issues:




## 2.19
Image upload & display functionality fixed

## 2.15
Original source code downloaded, project started

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



-- headache on deploying new version to heroku. Wouldn't update with <Linkify> component. Had to re-run npm run build to re-build the 'build' folder.

https://stackoverflow.com/questions/20508898/how-can-i-import-a-sql-file-into-my-heroku-postgres-database
import psql to heroku
heroku pg:psql --app YOUR_APP_NAME_HERE < updates.sql


pg_dump -U postgres policybytes > pbexport2.psql

pg_dump -U USERNAME DATABASE backup.sql
pg_dump policybytes


Facebook login func



04.10:
Trouble with getting the editable landing page text. Started going in circles. Going to hit the reset button and start over. Goal is to have an option in the Admin panel to edit the text that's on the landing page.