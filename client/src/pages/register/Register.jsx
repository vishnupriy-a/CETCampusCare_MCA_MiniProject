import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
// import { Prev } from "react-bootstrap/esm/PageItem";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:"",
    name:""
  });

  const [err, setErr] = useState(null);

  const handleChange =  (e) =>{
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}));
  };


  const handleClick =async (e) => {
    e.preventDefault()

    try{
    await axios.post("http://localhost:8001/api/auth/register", inputs);
    }catch (err) {
    setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <br/>
                 
          <h1>CET CampusCare</h1>
          <br/>
          <br/> 
          <br/>
          <p>Let's join together to make our campus a better place</p>
          <span>Have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
