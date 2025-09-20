import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Login from "../login/Login";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const res = await axios.post(
        "http://localhost:8081/auth/signup",
        formData
      );
      console.log("Response:", res.data);
      localStorage.setItem("token", res.data.token);

      if (res.data.roles.includes("ADMIN")) {
        navigate("/admin");

        localStorage.setItem("role", "ADMIN");
        return;
      }

      navigate("/user");
    } catch (err) {
      console.log("Error:", err);
      navigate("/login");
    }
  };

  return (
    <>
      <div className="one_Signup_Signup-container">
        <div className="one_Signup_row">
          <div className="one_Signup_col  one_Signup_col2">
            <div className="one_Signup_one_myform">
              <form onSubmit={handleSubmit}>
                <div style={{ textAlign: "center" }}>
                  <h1>Register</h1>
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="text"
                    placeholder="UserName"
                    id="userName"
                    autoComplete="off"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="email"
                    placeholder="Email"
                    id="email"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="one_Signup_inputi"
                    type="password"
                    placeholder="Password"
                    id="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p style={{ textAlign: "center", fontSize: "1.4rem" }}>
                    if you alredy have an account.?{" "}
                    <Link style={{ color: "orange" }} to="/login">
                      Login
                    </Link>
                  </p>
                </div>
                <div>
                  <input
                    className="one_Signup_btn"
                    type="submit"
                    value="Register"
                    id="register"
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="one_Signup_col one_Signup_image_col">
            <div className="one_Signup_vision-image-container">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlbpZFCuBRjfxNfYlWss2q-hWqQ2bKzeS0ixWzV7hP9BADdujQuwkDrm_abLYJihcJzE4&usqp=CAU"
                alt="Vision"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
