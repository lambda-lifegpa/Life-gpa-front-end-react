import React from "react";
import axios from "axios";
import { BrowserRouter as Route, Link } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./Nav";

const SignUph1 = styled.h1`
  text-align: center;
  font-size: 50px;
  color: #fff;
`;

const SignUpWrapper = styled.div`
  background-image: url("https://www.rd.com/wp-content/uploads/2018/02/00_Can-You-Guess-the-Famous-City-Based-on-Their-Skylines_441608320_Funny-Solution-Studio_FT.jpg");
  background-size: cover;
  height: 969px;
  width: 100%;
  max-width: 900px;
  max-height: 1050px;
  width: 80%;
  height: 100%;
  margin: 2% auto;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpInput = styled.input`
  margin: 2% 23%;

  padding: 20px 0;
  font-size: 40px;
  border-radius: 10px;
`;

const SignUph3 = styled.h3`
  padding-top: 10px;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 2% auto;
  padding: 20px;
  width: 50%;
  font-size: 20px;
  border-radius: 10px;
  background-color: ;
`;
const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: fllex-start;
`;
const StyledP = styled.p`
  color: #fff;
  font-size: 20px;
`;

class SignUp extends React.Component {
  state = {
    first_name: "",
    last_name: "",
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
    // console.log(this.props.history)
    const credentials = this.state;
    axios
      .post("http://lifegpadb.herokuapp.com/api/users/register", credentials)
      .then(res => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        this.props.history.push("/login");
      })
      .catch(err => console.log(err.response));
  };

  render() {
    return (
      <div>
        <NavBar />
        <SignUpWrapper className="signUp">
          <h1>Sign Up</h1>
          <SignUpForm className=".formContainer" onSubmit={this.handleSubmit}>
            <div className="form">
              <SignUpInput
                className="signUpInput firstName"
                type="first_name"
                name="first_name"
                placeholder="First name"
                onChange={this.handleChange}
                value={this.state.first_name}
                required
              />
              <SignUpInput
                className="signUpInput lastName"
                type="last_name"
                name="last_name"
                placeholder="Last name"
                onChange={this.handleChange}
                value={this.state.last_name}
                required
              />
              <SignUpInput
                className="signUpInput username"
                type="username"
                name="username"
                placeholder="Username"
                onChange={this.handleChange}
                value={this.state.username}
                required
              />
              <SignUpInput
                className="signUpInput password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handleChange}
                value={this.state.password}
                required
              />
            </div>
            <StyledButton className="signUpButton">Create Account</StyledButton>
          </SignUpForm>

          <div className="loginLink">
            <p>Already Have an Acount?</p>
            <pre> </pre>
            <Link to="/login" className="signUpLoginLink">
              Login
            </Link>
          </div>
        </SignUpWrapper>
      </div>
    );
  }
}

export default SignUp;
