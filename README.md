# Integral Server

This contains scripts to set up a database useing PostgreSQL and sets up a server to be used with API requests

## Set up

Clone this repository to your local machine `git clone integral-social-backend` <br>
cd into the cloned repository <br>
Make a fresh start of the git history for this project with `rm -rf .git & git init`

Install node dependencies `npm install`

Create a database for tables using PostgreSQL
Sample script : `psql CREATE DATABASE database_name`

Create .env file in the main path folder and add `DATABASE_URL="postgresql://username@localhost/database_name"` to path the server to the correct database.

From here, you can run `npm run migrate`, and it will create tables inside the database you created.

To install test databases, `psql CREATE DATABASE database_name_test`.
Add `TEST_DATABASE_URL="postgresql://username@localhost/database_name_test` to .env.
From here, run `npm run migrate:test` and it will create test tables inside of the test database.

This finishes the set up of the database on the local server.

## Scripts

Start the server with `npm run dev`

Run the tests `npm test`

## API Documentation

### /posts/:user_id

User_id must be specified as a parameter for every request, it is defaulted to the demo_id of 1 to start. When user registration is complete, it will use to the id of the user who is logged in.

When a GET request is made, all posts where user_id is equal to the user_id param is returned.

When a POST request is made, it checks if the body has content and user_id, if one of these are not there, an error is sent. If all these exist, the server attempts to add the cross scripting cleared item to the database.

## /users

When a POST request is made, it checks the body if the username and password is valid.
If a username has been taken already, an error is sent.
