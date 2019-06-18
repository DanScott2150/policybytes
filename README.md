# PolicyBytes

React-based SPA that provides a platform for multi-threaded, evidence-based debate.
### Link to Live Demo: https://policybytes-beta.herokuapp.com

## Major Tech Used:
    * React
    * Redux & Redux-Saga
    * Node.js & Express
    * PostgreSQL
    * React Bootstrap
    * Heroku

## Setup & Config
    * /server/server.js >> comment in/out designated code depending on local or deployed build
    * package.json >> set HTTPS=true
    * localhost.cert & localhost.key for https on localhost
    * Launch local build: npm run server, npm run client

## Background
PolicyBytes is a work-in-progress being developed for a friend at a nonprofit. The goal of the app is to provide a platform that allows participants to engage in a well-thought-out, multi-threaded, evidence-based debate, in a manner that (hopefully) allows readers to more thoroughly understand opposing viewpoints.

An initial bare-bones, semi-functional prototype of this app was developed by a group of bootcamp students as a part of their program's final project. That code was used as a starting point when I took over development. The initial source code I inherited can be found here: https://github.com/davidthekesler/policybytes


## Current Functionality
The app is structured around "Conversation Topics" - each conversation features two contributors who are considered authorities on the topic. The app allows the two contributors to engage in a multi-threaded, evidence-based discussion, in a way that (hopefully) encourages readers to have a more thorough understanding of the thought process and nuance associated with opposing viewpoints.

#### Main App
The home page displays a "featured" topic card, as well as an archive of all other topic cards. Clicking a card will take you to the topic page for that topic.

The topic page presents various metadata regarding the topic and the contributors, as well as a "discussion arena". The discussion arena is a box where each contributor gets to present their high-level stance on the topic, as well as various "key claims" that support their argument. Clicking on a given key claim will display a discussion thread, where the two contributors can engage in a back-and-forth with regards to that specific key claim.

Currently very basic functionality exists for users to "Join the conversation" and post comments of their own via their Facebook accounts.

#### Admin Panel
The app includes a back-end custom content management system, allowing a non-technical admin to maintain & update the app's content.

accessed via https://policybytes-beta.herokuapp.com/admin
(todo: will set up a read-only admin account for demo purposes)

Main admin page consists of a table showing each topic. Admin has the ability to add a new topic or edit existing topics, as well as the ability to toggle the visibility to either 'published' or 'draft' and the ability to change which topic is the "featured" topic on the front page.

Clicking 'Edit' on a topic brings you to a WYSIWYG editor, where the admin is able to instantly preview what changes will look like.

## Known Issues / To-do list
    * Top navigation bar links not working yet
    * Untestested on mobile screens & various browsers
    * Landing Page:
        * Current Converstation card: The topic summary ("Most servers and bartenders...") is currently hard-coded text. If the admin changes the featured topic, this text won't update. Will fix
    * Single Topic Page:
        * Common Ground & Discussion Arena: Currently configured to only display plaintext. Will update so it's able to display things like line breaks & bullet points, maybe basic formatting like bold/italic/underline as well as hyperlinks.
        * Discussion Arena: Functionality for users to like & comment on given key claims is currently disabled as a placeholder.
        * If one Key Claim is active and the discussion thread is visible for it, the user has to click twice to switch to a different Key Claim (once to "close" the current key claim, once more to "open" the new one). Will change to one-click
    * Admin Panel:
        * Add ability to register a new admin account
        * "Add New Topic" functionality currently somewhat buggy
        * Edit Topic Page: Adding & deleting key claims & stream items are still somewhat buggy in some cases.

## Future Projects & Ideas
