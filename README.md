# Pokedex Express App (with Postgres SQL)

For this exercise, we'll upgrade from storing pokedex data in a plain JSON file to a fully fledged Postgres database. The end result we want is a CRUD app for pokemon with data saved into a database.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `npm install` to install dependencies
3.  Create a new Postgres database by running `createdb pokemons -U <your_username>`
4.  Run `psql -U <your_username> -d pokemons -a -f tables.sql` to create a `pokemon` table in the database
5.  Seed data into the newly created `pokemon` table by running `node seed.js`( Note this will populate your DB with the contents of pokedex.json)
6.  Look in the starter file called `index.js`, run `nodemon` to start local server on port 3000
7.  Open `localhost:3000` on your browser and see the home page

## Deliverables

The deliverable is an app that has CRUD functionality on pokemons that can be associated with users. Some example code from the previous version of the exercise has been provided for you to build on, although you may extend your own code from the previous exercise if you wish to do so.

* DELETE `/pokemon/:id` should delete the entry of the pokemon with the specified ID, and should redirect to the home page `/`

* Create the relevant `tables.sql` file to create the appropriate table for your database

* Create new routes for user-creation

* Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id

* (FURTHER) Add a drop-down menu of all users on the pokemon form

* (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.

## Useful SQL commands

Note the proceeding commands should be run in a `psql` session on Terminal.

View all the data in a table:
```sql
SELECT * FROM pokemon;
```

Delete your database and start again if you made a mistake:
```sql
DROP DATABASE pokemons;
```

Or if you just need to reset the table:
```sql
DROP TABLE pokemons;
```