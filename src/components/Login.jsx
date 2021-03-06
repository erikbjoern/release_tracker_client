import React, { Component } from "react";
import { authenticate } from "../modules/auth";
import { getUserSelection } from "../modules/tracking";

export default class Login extends Component {
  state = {
    loginMessage: "",
  };

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      let userSelection = await getUserSelection();
      this.props.setUserSelection(userSelection.response);
      this.props.globalAuthHandler(true);
      this.props.goToPage("search");
    } else {
      this.setState({ loginMessage: response.message });
    }
  };

  render() {
    return (
      <>
        <div>
          <h2>Log in</h2>
          <form id="login-form" onSubmit={this.onLogin}>
            <label for="email">Email</label>
            <input name="email" type="email" id="email"></input>
            <label for="password">Password</label>
            <input name="password" type="password" id="password"></input>
            <button id="submit">Submit</button>
            <p id="login-message">{this.state.loginMessage}</p>
          </form>
        </div>
        <div>
          {" "}
          <a onClick={() => this.props.goToPage("signup")}>
            Need an account? Sign up instead
          </a>
        </div>
        <div>
          {" "}
          <a onClick={() => this.props.goToPage("search")}>Go back</a>{" "}
        </div>
      </>
    );
  }
}
