Ride Share Project

Jeff Jewett, Jerrod Anderson

# ORM Testing

You can run the tests for the ORM by running the following commands

relations and GET tests: node ./tests/relationTests

delete tests: node ./tests/deleteTests.js

update tests: node ./tests/updateTests.js

create tests: node ./tests/createTests.js

# COS-243 - Full-Stack Sample

Full-stack sample application, including:
* Vue UI
* Hapi RESTful API
* Objection/Knex data access layer
* PostgreSQL database

## Install Node packages

1. From the command line, run `yarn`

## Set Up Database

1. Update the Knex configuration in `hapi-server.js`
   with your database credentials.
2. Create the database tables by executing `models/create-schema.sql`
   (e.g., from a DataGrip console or the `psql` command line client).
3. Load sample data into the database by executing `models/insert-test-data.sql`

## Run Server

1. From a command prompt, execute `yarn api-watch`.
   This should start up the server.
   
## Run UI

1. From a _different_ command prompt, execute `yarn ui-watch`.
   This should start the Vue development server.
2. Open your browser to one of the URLs 
   output by the Vue development server
