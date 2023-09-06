import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/signup.css";
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.css';


function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    DOB: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status === "Success") {
          toast.success("Registered successfully");
        } else if (responseData.status === "Fail") {
          toast.error(responseData.message);
        }
      })
      .catch((err) => {
        toast.error("Error occurred while registering", err);
      });
  };

  return (
    <div className="signUpContainer">
      <ToastContainer />
      <form className="signUpBox" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="fullName"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="fullName"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="number">Contact No.</label>
          <input
            type="number"
            className="fullName"
            id="number"
            name="number"
            value={data.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="DOB">Date of Birth</label>
          <input
            type="date"
            className="fullName"
            id="DOB"
            name="DOB"
            value={data.DOB}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="fullName"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          <img
            src={showPassword ? hide : show}
            alt="show"
            height={20}
            width={20}
            style={{
              position: "absolute",
              bottom: "87px",
              cursor: "pointer",
              right: "450px",
            }}
            onClick={togglePassword}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="fullName"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
          />
          <img
            src={showPassword ? hide : show}
            alt="show"
            height={20}
            width={20}
            style={{
              position: "absolute",
              bottom: "7px",
              right: "450px",
              cursor: "pointer",
            }}
            onClick={togglePassword}
          />
        </div>
        <div>
          <button className="btn" style={{ width: "452px" }} type="submit">
            Sign Up
          </button>
        </div>
        <div>
          <p>
            Already a member? Try{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
