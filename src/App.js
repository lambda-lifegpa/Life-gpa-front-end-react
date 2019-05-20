import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import SignupForm from "./components/Signupform";
import "./App.css";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignupForm} />
      <PrivateRoute exact path="/protected" component={Dashboard} />
    </div>
  );
}

export default App;
