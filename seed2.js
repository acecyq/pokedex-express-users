// REMEMBER TO CHANGE YOUR CONFIGS BEFORE RUNNING THIS SCRIPT!!
const pg = require('pg');
const config = {
	user: 'acechua',
	host: '127.0.0.1',
	database: 'pokemons',
	port: '5432'
};

if (config.user === 'ck') {
	throw new Error("====== UPDATE YOUR DATABASE CONFIGURATION =======");
}

const pool = new pg.Pool(config);

pool.on('error', function (err) {
  console.log('Idle client error', err.message, err.stack);
});

// insert pokemon types into table types
let typeList = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"];
let queryString = 'INSERT INTO types (types) VALUES ($1) EXCEPT SELECT types FROM types WHERE types = $1 RETURNING *';
let values;
typeList.forEach(el => {
	values = [el];
	pool.query(queryString, values, (err, result) => {
		if (err) {
			console.log("Query Error: ", err);
		} else {
			console.log(result.rows[0]);
		}
	});
});