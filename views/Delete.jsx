var React = require("react");

class Delete extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Deleting: {this.props.pokemon.name}</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/pokemon/"+ this.props.pokemon.id + "?_method=DELETE"}
          >
            <div className="pokemon-attribute">
              id:<input 
                name="id" 
                type="text" 
                defaultValue={this.props.pokemon.id} 
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              num:<input
                name="num"
                type="text"
                defaultValue={this.props.pokemon.num}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              name:<input
                name="name"
                type="text"
                defaultValue={this.props.pokemon.name}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              img:<input
                name="img"
                type="text"
                defaultValue={this.props.pokemon.img}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              height:<input
                name="height"
                type="text"
                defaultValue={this.props.pokemon.height}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              weight:<input
                name="weight"
                type="text"
                defaultValue={this.props.pokemon.weight}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              user id:<input
                name="user_id"
                type="text"
                defaultValue={this.props.pokemon.user_id}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              candy:<input
                name="candy"
                type="text"
                defaultValue={this.props.pokemon.candy}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              candy_count:<input
                name="candy_count"
                type="text"
                defaultValue={this.props.pokemon.candy_count}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              egg:<input
                name="egg"
                type="text"
                defaultValue={this.props.pokemon.egg}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              avg_spawns:<input
                name="avg_spawns"
                type="text"
                defaultValue={this.props.pokemon.avg_spawns}
                readOnly
              />
            </div>
            <div className="pokemon-attribute">
              spawn_time:<input
                name="spawn_time"
                type="text"
                defaultValue={this.props.pokemon.spawn_time}
                readOnly
              />
            </div>
            <input name="delete" type="submit" value="Delete" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
