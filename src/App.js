import React from "react";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import SignupForm from "./components/Signupform";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignupForm} />
    </div>
  );
}

export default App;
