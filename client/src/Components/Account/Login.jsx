import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";
import apiURL from "../config";

const Register = () => {
  const history = useNavigate();
  const api = apiURL.url;
  const [sendData, setSendData] = useState({
    email: "",
    password: ""
  });

  const changeData = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };
  console.log(sendData);

  const submitToRegister = async (e) => {
    e.preventDefault();

    const { email, password } = sendData;
    if (!email || !password) {
      alert("Enter all fields");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password.length < 6) {
      alert("Password should be at least 6 characters long");
    } else {
      console.log("reg");

      const data = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      });
      const res = await data.json();
      // console.log(res);
      if (res.status === 201) {
        alert("Email is not registered");
        console.log(res);
      } else if (res.status === 202) {
        alert("Password not found");
        console.log(res);
      } else if (res.status === 203) {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        history("/employee");
        window.location.reload();
      }
    }
  };

  return (
    <div className="reg">
      <div className="regContainer">
        <div className="form">
          <h1>Welcome to Login</h1>
        </div>
        <div className="form">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={sendData.email}
            onChange={changeData}
            placeholder="Enter your email"
          />
        </div>
        <div className="form">
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={sendData.password}
            onChange={changeData}
            placeholder="Enter password"
          />
        </div>
        <div className="form">
          <button onClick={submitToRegister}>Login</button>
        </div>
        <div className="form">
          <p>
            have not an Account? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
