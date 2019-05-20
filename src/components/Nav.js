import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <div>
          <button className="sign-out">
            <NavLink exact to="/login">
              sign out
            </NavLink>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
