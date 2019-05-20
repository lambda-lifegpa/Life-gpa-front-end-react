import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../actions";
import axios from "axios";
const SignUph1 = styled.h1`
  text-align: center;
`;

const SignUpWrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: 2% auto;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpInput = styled.input`
  margin: 2%;
  padding: 20px 0;
  font-size: 40px;
  border-radius: 10px;
`;

const SignUph3 = styled.h3`
  padding-top: 10px;
`;

const StyleButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 2% auto;
  padding: 20px;
  width: 50%;
  font-size: 20px;
`;
class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      password: ""
    };
  }

  handleInput = event => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [event.target.name]: event.target.value
      }
    });
  };

  // signup

  signUp = event => {
    event.preventDefault();
    const credentials = this.state;
    return axios
      .post("https://lifegpadb.herokuapp.com/api/users/register", credentials)
      .then(res => {
        this.props.history.push("/login");
      })
      .catch(err => console.log(err.response));
  };
  render() {
    return (
      <SignUpWrapper>
        <SignUph1>Sign Up for LifeGPA today!</SignUph1>
        <SignUpForm onSubmit={this.signUp}>
          <SignUpInput
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleInput}
          />
          <SignUpInput
            type="text"
            name="first-name"
            placeholder="First Name"
            onChange={this.handleInput}
          />
          <SignUpInput
            type="text"
            name="last-name"
            placeholder="Last Name"
            onChange={this.handleInput}
          />
          <SignUpInput
            type="text"
            name="password"
            placeholder="password"
            onChange={this.handleInput}
          />
          <StyleButton className="signup-btn" type="submit">
            Discover Your GPA
          </StyleButton>
        </SignUpForm>
        <SignUph3>Already Signed up?</SignUph3>
        <StyleButton className="login">
          <Link className="login-link" to="/login">
            Log In
          </Link>
        </StyleButton>
      </SignUpWrapper>
    );
  }
}

const mapStateToProps = ({ error, signingUp }) => ({ error, signingUp });

export default connect(
  mapStateToProps,
  { signUp }
)(SignupForm);
