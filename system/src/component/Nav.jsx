import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Nav({setLoginStatus}) {
  function handleLogoutClick(e) {
    setLoginStatus(false);
    localStorage.setItem("loggedIn", "false");
    axios.get("/api/deleteCookie").then((res) => {
      console.log(res.data);
    });
  }
  return (
    <div className="app-nav">
      <ul>
        {localStorage.getItem("role") == "admin" ? (
          <li>
            <NavLink
              to="/app"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
          </li>
        ) : null}

        {localStorage.getItem("role") == "admin" && (
          <li>
            <NavLink
              to="/admin"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              Admin
            </NavLink>
          </li>
        )}

        <i
          class="fa fa-sign-out"
          aria-hidden="true"
          onClick={handleLogoutClick}
        ></i>
      </ul>
    </div>
  );
}

export default Nav;
