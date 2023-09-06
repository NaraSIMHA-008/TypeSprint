import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";
import { useState } from "react";
import show from "../assets/show.png";
import hide from "../assets/hide.png";
import WebFont from "webfontloader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

WebFont.load({
  google: {
    families: ["Play&display=swap"],
  },
});

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/user/login`, formData)
      .then((res) => {
        if (res.data.status === "Success") {
          toast.success("Login successful");
          const accessToken = res.data.token;
          const id = res.data.user.id; // Assuming the server sends the id in the response
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("id", id);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while logging in");
      });
  };

  return (
    <div className="container1">
      <ToastContainer />
      <form className="formBox" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <div className="mailBox">
            <label className="labelBox" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              className="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mailBox">
            <label className="labelBox" htmlFor="password">
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              className="email"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <img
              src={showPassword ? hide : show}
              alt="show"
              height={20}
              width={20}
              style={{
                position: "absolute",
                top: "300px",
                right: "460px",
                cursor: "pointer",
              }}
              onClick={togglePassword}
            />
          </div>
          <hr className="line" />
          <button className="btnBox" type="submit">
            Login
          </button>
          <div className="forgotBox">
            <p>
              New to TypeSprint? Try <Link to="/signup">Sign Up</Link>
            </p>
            <p>
              <Link to="/">Forgot Password</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
