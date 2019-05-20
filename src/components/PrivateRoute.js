import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  errorStatusCode,
  token,
  ...rest
}) => {
  return (
    <div>
      <Route
        {...rest}
        render={props =>
          token && errorStatusCode !== 403 ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    </div>
  );
};

const mapStateToProps = ({ token, errorStatusCode }) => ({
  errorStatusCode,
  token
});

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(PrivateRoute)
);
