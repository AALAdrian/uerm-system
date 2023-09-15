import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ipLogo from "../assets/ip-logo.png";
import { useNavigate } from "react-router-dom";

function Nav({ setLoginStatus }) {
  const navigate = useNavigate();

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
          <li className="home">
            <img
              className="ip-logo"
              src={ipLogo}
              onClick={() => navigate("/app")}
            />
          </li>
        ) : null}

        

        {localStorage.getItem("role") == "admin" && (
          <li className="admin">
            <NavLink
              to="/app/admin"
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
