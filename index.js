/**
 * To-do for homework on 28 Jun 2018
 * =================================
 * 1. Create the relevant tables.sql file
 * 2. New routes for user-creation
 * 3. Change the pokemon form to add an input for user id such that the pokemon belongs to the user with that id
 * 4. (FURTHER) Add a drop-down menu of all users on the pokemon form
 * 5. (FURTHER) Add a types table and a pokemon-types table in your database, and create a seed.sql file inserting relevant data for these 2 tables. Note that a pokemon can have many types, and a type can have many pokemons.
 */

const express = require('express');
const methodOverride = require('method-override');
const pg = require('pg');

// require for hashing
const sha256 = require('js-sha256');

// require for cookie parser
const cookieParser = require('cookie-parser');

// Initialise postgres client
const config = {
  user: 'acechua',
  host: '127.0.0.1',
  database: 'pokemons',
  port: 5432,
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
};

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// use cookie parser
app.use(cookieParser());


// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

/**
 * ===================================
 * Route Handler Functions
 * ===================================
 */

const getRoot = (request, response) => {

  // query database for all pokemon
  // respond with HTML page displaying all pokemon
  const queryString = 'SELECT * from poke;';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      // console.log('Query result:', result);
      let userId
      if (request.cookies['logged_in'] === 'true') {
        userId = request.cookies['user_id'];
      } else {
        userId = 0;
      }
      // redirect to home page
      response.render( 'home', {pokemon: result.rows, id: userId} );
    }
  });
}

const getNew = (request, response) => {
  response.render('new');
}

const getPokemon = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM poke WHERE id = ' + id + ';';

  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result);

      // redirect to home page
      response.render( 'pokemon', {pokemon: result.rows[0]});
    }
  });
}

const postPokemon = (request, response) => {
  let params = request.body;
  const qs = 'SELECT COUNT(id) FROM poke';
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  // not sure why this doesnt work
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  let newNum;

  pool.query(qs, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("result is ", result);
      console.log("result.rows[0].count is ", result.rows[0].count);
      newNum = result.rows[0].count;  
    }
  })
  
  // if (isNaN(newNum) === false) {
    console.log("newNum is ", newNum);
    console.log(typeof newNum);
    // console.log("request.cookies['user_id'] = ", request.cookies['user_id']);
    // console.log("type of user_id = ", typeof request.cookies['user_id']);
    let id;
    if (request.cookies['logged_in'] === 'true') {
      id = parseInt(request.cookies['user_id'], 10);  
    } else {
      id = null;
    }
    const queryString = 'INSERT INTO poke(name, num, img, height, weight, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [params.name, newNum, params.img, params.height, params.weight, id];
    console.log("values = ", values);

    pool.query(queryString, values, (err, result) => {
      if (err) {
        console.log('query error:', err.stack);
      } else {
        console.log('query result:', result.rows[0]);

        // redirect to home page
        response.redirect('/');
      }
    });
  // }
};

const editPokemonForm = (request, response) => {
  let id = request.params['id'];
  const queryString = 'SELECT * FROM poke WHERE id = ' + id + ';';
  pool.query(queryString, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result.rows[0]);

      // redirect to home page
      response.render( 'edit', {pokemon: result.rows[0]} );
    }
  });
}

const updatePokemon = (request, response) => {
  let id = request.params['id'];
  let pokemon = request.body;
  // const queryString = 'UPDATE "poke" SET "num"=($1), "name"=($2), "img"=($3), "height"=($4), "weight"=($5) WHERE "id"=($6) RETURNING *';
  const queryString = 'UPDATE poke SET num = $1, name = $2, img = $3, height = $4, weight = $5 WHERE id = $6 RETURNING *';
  const values = [pokemon.num, pokemon.name, pokemon.img, pokemon.height, pokemon.weight, id];
  // console.log(queryString);
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error:', err.stack);
    } else {
      console.log('Query result:', result.rows[0]);

      // redirect to home page
      response.redirect('/');
    }
  });
}

const deletePokemonForm = (request, response) => {
  let queryString = 'SELECT * FROM poke WHERE id = $1';
  let values = [parseInt(request.params['id'], 10)];
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error: ' + err);
    } else {
      response.render('delete', {pokemon: result.rows[0]});  
    }
  })
}

const deletePokemon = (request, response) => {
  let queryString = 'DELETE FROM poke WHERE id = $1 RETURNING *';
  let values = [parseInt(request.body.id, 10)];
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error('Query error: ' + err);
    } else {
      console.log(result.rows[0]);
      response.redirect('/');  
    }
  })
  
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getRoot);

app.get('/pokemon/:id/edit', editPokemonForm);
app.get('/pokemon/new', getNew);
app.get('/pokemon/:id', getPokemon);
app.get('/pokemon/:id/delete', deletePokemonForm);

app.post('/pokemon', postPokemon);
app.put('/pokemon/:id', updatePokemon);
app.delete('/pokemon/:id', deletePokemon);

// TODO: New routes for creating users

const userForm = (req, res) => {
  res.render('newUser');
}

const createUser = (req, res) => {
  // console.log(req.body);
  // let value = [req.body.email];
  
  // let qs = 'SELECT FROM users WHERE email = $1';
  // pool.query(qs, value, (err1, result1) => {
  //   if (err1) {
  //     console.log(err1);
  //   } else if (result1.rows.length > 1) {
  //     res.send("Email already exists!");
  //     return;
  //   }
  // })

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  // not sure why this doesnt work
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  
  let password_hash = sha256(req.body.password);
  let values = [req.body.first_name, req.body.last_name, req.body.email, password_hash];
  let queryString = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
  pool.query(queryString, values, (err2, result2) => {
    if (err2) {
      console.log(err2);
    } else {
      console.log(result2.rows[0]);

      let fullName = values[0] + " " + values[1];
      res.send("Welcome " + fullName);
    }
  })
}

const login = (req, res) => {
  res.render('Login');
}

const welcomeUser = (req, res) => {
  let queryString = 'SELECT * FROM users WHERE email = $1 AND password = $2';
  let values = [req.body.email, sha256(req.body.password)];
  pool.query(queryString, values, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result.rows.length > 0) {
        res.cookie('user_id', result.rows[0].id);
        res.cookie('logged_in', 'true');
        let fullName = result.rows[0].first_name + " " + result.rows[0].last_name;
        res.send("Welcome " + fullName + "!");
        
      } else {
        res.status(401).send("Wrong email or password. Please try again.");
      }
    }
  });
}

const logout = (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('logged_in');
  res.redirect('/')
}

app.get('/user/new', userForm);
app.get('/user/login', login);
app.get('/user/logout', logout)

app.post('/user', createUser);
app.post('/user/login', welcomeUser);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const server = app.listen(3000, () => console.log('~~~ Ahoy we go from the port of 3000!!!'));



// Handles CTRL-C shutdown
function shutDown() {
  console.log('Recalling all ships to harbour...');
  server.close(() => {
    console.log('... all ships returned...');
    pool.end(() => {
      console.log('... all loot turned in!');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);


