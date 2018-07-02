const jsonfile = require('jsonfile');
const FILE = 'pokedex2.json';

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

jsonfile.readFile(FILE, (err, obj) => {
	if (err) {
		console.log("readFile error: ", err);
	} else {
		let pokemons = obj.pokemon;
		let typeList = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"];
		let qs = "INSERT INTO pokemon_types (poke_id, name, types_id, type) VALUES ($1, $2, $3, $4) RETURNING *";
		let values;
		pokemons.forEach(el => {
			// let typeId = "";
			el.type.forEach(type => {
				let typeId = typeList.indexOf(type) + 1;
				values = [el.id, el.name, typeId, type];
				pool.query(qs, values, (err, result) => {
					if (err) {
						console.log("Query error is ", err);
					} else {
						console.log(result.rows[0]);
					}
				});

			})
		})
	}
});