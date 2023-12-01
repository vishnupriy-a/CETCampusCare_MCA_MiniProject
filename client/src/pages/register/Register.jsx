
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: ""
  });

  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
    name: null
  });

  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = null;

    if (value.trim() === "") {
      errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (name === "email" && value.trim() !== "") {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        errorMessage = "Please enter a valid email address";
      }
    }

    if (name === "name" && value.trim() !== "") {
      const isValidName = /^[a-zA-Z]*$/.test(value);
      if (!isValidName) {
        errorMessage = "Name can only contain alphabetic characters";
      }
    }

    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== null);
    if (hasErrors) {
      return;
    }

    try {
      await axios.post("http://localhost:8001/api/auth/register", inputs);
      // Handle successful registration, redirect or display success message
    } catch (err) {
      setErr(err.response.data); // Set the error state in case of API failure
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <br />
          <h1>CET CampusCare</h1>
          <br />
          <br />
          <br />
          <p>Let's join together to make our campus a better place</p>
          <span>Have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}

            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}

            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            {err && <p className="error">{err}</p>}

            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
