import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const data = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const res = await axios.post("http://localhost:8081/auth/login", data);

      localStorage.setItem("token", res.data.token);

      console.log(res.data.token);

      if (res.data.roles.includes("ADMIN")) {
        navigate("/admin");

        localStorage.setItem("role", "ADMIN");
        return;
      }

      navigate("/user"); // Example redirect
    } catch (err) {
      console.log("Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <h1 className="text-amber-400 absolute top-8 text-5xl font-bold">
        Welcome to Mysore Sweets
      </h1>
      <div className="login-row">
        <div className="login-col login-form-col">
          <div className="login-form">
            <form onSubmit={handleLogin} data-testid="login-form">
              <div style={{ textAlign: "center" }}>
                <h1>Login</h1>
              </div>
              <div>
                <input
                  className="login-input"
                  type="email"
                  placeholder="Email"
                  id="email"
                  data-testid="login-email"
                  autoComplete="off"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input
                  className="login-input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  data-testid="login-password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <p style={{ textAlign: "center", color: "green" }}>
                  Don’t have an account? <Link to="/signup">Register</Link>
                </p>
              </div>
              <div>
                <input
                  className="login-btn"
                  type="submit"
                  value="Login"
                  id="login"
                  data-testid="login-submit"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="login-col login-image-col">
          <div className="login-image-container">
            <img
              src="https://img.freepik.com/free-photo/indulgent-dessert-arrangement-with-sweets-generated-by-ai_188544-43144.jpg"
              alt="Vision"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
