import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
  try {
    console.log(name, email, password);

    const res = await axios.post(
      "http://localhost:5000/api/users/register",
      { name, email, password }
    );
    console.log(res.data);
    alert("Success 🌱");

    navigate("/");
  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>🌿 Create Eco Account</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={registerUser}>Register 🚀</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>

      </div>

    </div>
  );
};

export default Register;