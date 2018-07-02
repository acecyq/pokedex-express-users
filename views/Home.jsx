var React = require("react");

class Home extends React.Component {
  render() {
    // console.log(this);
    let userPokemon = [];
    this.props.pokemon.forEach(el => {
      if (el.user_id == this.props.id) {
        userPokemon.push(el);
      }
    })
    let tableList = userPokemon.map(pokemon => {
      return (
        <tr>
          <td>{pokemon.id}</td>
          <td>{pokemon.name}</td>
        </tr>  
      )
    })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Pokedex</h1>
          <ul>
            {this.props.pokemon.map(pokemon => (
              <li key={pokemon.id}>
                {pokemon.id} {pokemon.name}
              </li>
            ))}
          </ul>
          <h1>Your Pokemon</h1>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
              </tr>
            </thead>
            <tbody>
              {tableList}
            </tbody>
          </table>
        </body>
      </html>
    );
  }
}

module.exports = Home;
