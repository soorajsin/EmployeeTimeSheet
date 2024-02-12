import React, { useCallback, useEffect, useState } from "react";
import { AppBar, Avatar, Toolbar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import "./Nav.css";
import apiURL from "../config";

const Nav = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const [userData, setUserData] = useState();
  // console.log(userData);
  const navAuth = useCallback(async () => {
    try {
      const token = await localStorage.getItem("token");
      // console.log(token);
      const data = await fetch(`${api}/validator`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 201) {
        // console.log(res);
        setUserData(res);
      } else if (res.status === 202) {
        console.log("user not authorized");
      }
    } catch (error) {
      console.log(error);
    }
  }, [api]);
  useEffect(() => {
    navAuth();
  }, [navAuth]);

  const signOut = async () => {
    try {
      const token = await localStorage.getItem("token");
      const data = await fetch(`${api}/signOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 203) {
        console.log(res);
        localStorage.removeItem("token");
        history("/");
        window.location.reload();
      } else {
        alert("User not log Out");
      }
    } catch (error) {
      console.log("failed to signOut", error);
    }
  };

  return (
    <AppBar>
      <Toolbar>
        <div className="nav">
          <div className="navCon">
            <div className="tab">
              <NavLink className={"navTab"}>
                {/* Logo */}
                <img
                  src="https://shopping-app-xx1p.vercel.app/static/media/Sooraj-logo.4ea9ba32a0c93354b8a8.png"
                  alt="logo"
                />
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/home"} className={"navTab"}>
                Home
              </NavLink>
            </div>
            <div className="tab">
              <NavLink to={"/shopping"} className={"navTab"}>
                Shopping
              </NavLink>
            </div>
            {/* staff data */}
            {userData
              ? userData.data.role === "staff" && (
                  <>
                    <div className="tab">
                      <NavLink to={"/management"} className={"navTab"}>
                        Management
                      </NavLink>
                    </div>
                    <div className="tab">
                      <NavLink to={"/track"} className={"navTab"}>
                        Track
                      </NavLink>
                    </div>
                  </>
                )
              : ""}

            <div className="tab">
              <NavLink to={"/"} className={"navTab"}>
                Login
              </NavLink>
            </div>
            <div className="tab">
              <NavLink className={"navTab"}>
                <Avatar className="avatarIcon">
                  {userData ? userData.data.email.charAt(0).toUpperCase() : ""}
                </Avatar>
              </NavLink>
              <div className="avatar">
                <div className="avaCon">
                  <div className="avatab">
                    <NavLink className={"avatabNav"}>
                      {userData ? userData.data.email : "Email"}
                    </NavLink>
                  </div>
                  <div className="avatab">
                    <NavLink to={"/home"} className={"avatabNav"}>
                      Home
                    </NavLink>
                  </div>
                  <div className="avatab">
                    <NavLink to={"/shopping"} className={"avatabNav"}>
                      Shopping
                    </NavLink>
                  </div>
                  {userData
                    ? userData.data.role === "staff" && (
                        <>
                          <div className="avatab">
                            <NavLink to={"/management"} className={"avatabNav"}>
                              Management
                            </NavLink>
                          </div>
                          <div className="avatab">
                            <NavLink to={"/track"} className={"avatabNav"}>
                              Track
                            </NavLink>
                          </div>
                        </>
                      )
                    : ""}
                  <div className="avatab" onClick={signOut}>
                    <NavLink className={"avatabNav"}>Log Out</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
