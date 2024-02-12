import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./mix.css";
import apiURL from "../config";

const Register = () => {
  const api = apiURL.url;
  const history = useNavigate();
  const [sendData, setSendData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    role: "employee"
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

    const { name, email, password, cpassword } = sendData;
    if (!name || !email || !password || !cpassword) {
      alert("Enter all fields");
    } else if (!email.includes("@")) {
      alert("Enter valid email");
    } else if (password.length < 6 || cpassword < 6) {
      alert("Password should be at least 6 characters long");
    } else if (password !== cpassword) {
      alert("Please Enter  the same Password and Confirm Password");
    } else {
      console.log("reg");

      const data = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      });
      const res = await data.json();
      //   console.log(res);
      if (res.status === 201) {
        alert("Email Already Registered");
        console.log(res);
        history("/");
      } else if (res.status === 202) {
        console.log(res);
        history("/");
      }
    }
  };

  return (
    <div className="reg">
      <div className="regContainer">
        <div className="form">
          <h1>Welcome to Register</h1>
        </div>
        <div className="form">
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={sendData.name}
            onChange={changeData}
            placeholder="Enter your name"
          />
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
          <label htmlFor="cpassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="cpassword"
            value={sendData.cpassword}
            onChange={changeData}
            placeholder="Enter confirm password"
          />
        </div>
        <div className="form">
          <label htmlFor="manager">Manager</label>
          <input
            type="checkbox"
            name="role"
            checked={sendData.role === "manager"}
            onChange={() => {
              setSendData({
                ...sendData,
                role: sendData.role === "employee" ? "manager" : "employee"
              });
            }}
          />
        </div>
        <div className="form">
          <button onClick={submitToRegister}>Register</button>
        </div>
        <div className="form">
          <p>
            Already have an Account? <NavLink to="/">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
