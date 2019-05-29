import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signupform";
import HomePage from "./components/homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/signUp" render={props => <SignUp {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/home" render={props => <HomePage {...props} />} />
      </div>
    );
  }
}

export default App;
