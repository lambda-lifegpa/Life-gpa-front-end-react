import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { login } from "../actions";
import Nav from "./Nav";

const StyledInput = styled.input`
  margin: 2%;
  padding: 20px 0;
  font-size: 40px;
  border-radius: 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginH1 = styled.h1`
  color: lightcyan;
  text-align: center;
`;

const LoginWrapperDiv = styled.div`
  width: 80%;
  height: 100%;
  margin: 2% auto;
  background-image: url("https://www.rd.com/wp-content/uploads/2018/02/00_Can-You-Guess-the-Famous-City-Based-on-Their-Skylines_441608320_Funny-Solution-Studio_FT.jpg");
  background-size: cover;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 2% auto;
  padding: 20px;
  width: 50%;
  font-size: 20px;
  border-radius: 10px;
  background: darkgrey;
`;
const LoginH3 = styled.h3`
  padding-top: 10px;
  color: #fff;

  text-align: center;
`;

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const credentials = this.state;
    axios
      .post("http://lifegpadb.herokuapp.com/api/users/login", credentials)
      .then(res => {
        console.log(res.data, "5");
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        this.props.history.push("/home");
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <>
        <Nav />
        <LoginWrapperDiv>
          <LoginH1>Welcome Back to LifeGPA!</LoginH1>
          <LoginForm onSubmit={this.handleSubmit}>
            <StyledInput
              type="username"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            />
            <StyledInput
              type="password"
              name="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.handleChange}
            />

            <StyledButton
              onClick={this.handleSubmit}
              className="submit-login"
              type="submit"
            >
              Log in
            </StyledButton>
          </LoginForm>
          <LoginH3>Not signed up yet?</LoginH3>
          <StyledButton className="sign-up-link">
            <Link to="/signup">Sign up now</Link>
          </StyledButton>
        </LoginWrapperDiv>
      </>
    );
  }
}

export default Login;
