import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions";
import Loader from "react-loader-spinner";
import axios from "axios";

const StyledInput = styled.input`
  margin: 2%;
  padding: 2%;
  font-size: 20px;
  border-radius: 10px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginH1 = styled.h1`
  text-align: center;
`;

const LoginWrapperDiv = styled.div`
  padding: 5%;
  width: 80%;
  height: 100%;
  margin: 0 10%;
`;

const LoginH3 = styled.h3`
  padding-top: 15px;
`;

const StyledBtn = styled.button`
  display: flex;
  justify-content: center;
  margin: 2% auto;
  padding: 20px;
  width: 50%;
  font-size: 20px;
`;
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        username: "",
        password: ""
      }
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

  //   handleSubmit = event => {
  //     event.preventDefault();
  //     const credentials = this.state;
  //     axios
  //       .post("https://lifegpadb.herokuapp.com/api/users/login", credentials)
  //       .then(res => {
  //         const username = res.data.username;
  //         const token = res.data.token;
  //         localStorage.setItem("token", token);
  //         localStorage.setItem("username", username);
  //         this.props.history.push("/protected");
  //       })
  //       .catch(err => console.log(err.response));
  //   };
  login = event => {
    event.preventDefault();
    this.props
      .login(this.state.credentials)
      .then(() => this.props.history.push("/protected"))
      .catch(err => console.log(err));
  };

  render() {
    if (this.props.signingIn)
      return <Loader type="Audio" color="#C62727" height={100} width={100} />;
    else
      return (
        <LoginWrapperDiv>
          <LoginH1>Welcome Back!</LoginH1>

          <LoginForm onSubmit={this.login}>
            <StyledInput
              type="text"
              name="username"
              value={this.state.credentials.username}
              placeholder="Username"
              onChange={this.handleInput}
            />
            <StyledInput
              type="password"
              name="password"
              value={this.state.credentials.password}
              placeholder="password"
              onChange={this.handleInput}
            />
            <StyledBtn className="login" type="submit">
              Log in
            </StyledBtn>
          </LoginForm>
          <LoginH3>
            <Link to="/signup">Not signed up yet?</Link>
          </LoginH3>
        </LoginWrapperDiv>
      );
  }
}

const mapStateToProps = ({ error, loggingIn }) => ({ error, loggingIn });

export default connect(
  mapStateToProps,
  { login }
)(Login);
