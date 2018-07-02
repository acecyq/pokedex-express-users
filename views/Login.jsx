var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h4>User Login</h4>
          <form
            className="pokemon-form"
            method="POST"
            action="/user/login"
          >
            <div className="pokemon-attribute">
              email:<input
                name="email"
                type="text"
              />
            </div>
            <div className="pokemon-attribute">
              password:<input
                name="password"
                type="password"
              />
            </div>
            <input name="submit" type="submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;
