var React = require("react");

class NewUser extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>Registration</h4>
          <form
            className="pokemon-form"
            method="POST"
            action={"/user"}
          >
            <div className="pokemon-attribute">
              first name:<input
                name="first_name"
                type="text"
              />
            </div>
            <div className="pokemon-attribute">
              last name:<input
                name="last_name"
                type="text"
              />
            </div>
            <div className="pokemon-attribute">
              email:<input
                name="email"
                type="text"
              />
            </div>
            <div className="pokemon-attribute">
              password:<input
                name="password"
                type="text"
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewUser;
