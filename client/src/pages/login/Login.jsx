import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    showPassword: false, // Add state for showing/hiding password
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePasswordVisibility = () => {
    setInputs((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <br />
          <br />
          <h1>CET CampusCare</h1>
          <p>Let's join together to make our campus a better place</p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <div className="password-input">
              <input
                type={inputs.showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              {/* Toggle password visibility */}
              {inputs.showPassword ? (
                <FiEyeOff onClick={togglePasswordVisibility} />
              ) : (
                <FiEye onClick={togglePasswordVisibility} />
              )}
            </div>
            {err && <p className="error-message">{err}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;



/////////////////////////////////////////////////////////
// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
// import "./login.scss";
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons

// const Login = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     password: "",
//     showPassword: false,
//   });
//   const [err, setErr] = useState(null);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const togglePasswordVisibility = () => {
//     setInputs((prev) => ({ ...prev, showPassword: !prev.showPassword }));
//   };

//   const { login } = useContext(AuthContext);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!inputs.username || !inputs.password) {
//       setErr("Fill all the fields");
//       return;
//     }
//     try {
//       await login(inputs);
//       navigate("/");
//     } catch (err) {
//       setErr(err.response.data);
//     }
//   };

//   return (
//     <div className="login">
//       <div className="card">
//         <div className="left">
//           <br />
//           <br />
//           <h1>CET CampusCare</h1>
//           <p>Let's join together to make our campus a better place</p>
//           <span>Don't you have an account?</span>
//           <Link to="/register">
//             <button className="regbutton">Register</button>
//           </Link>
//         </div>
//         <div className="right">
//           <h1>Login</h1>
//           <form>
//             <input
//               type="text"
//               placeholder="Username"
//               name="username"
//               onChange={handleChange}
//             />
//             <div className="password-input">
//               <input
//                 type={inputs.showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 name="password"
//                 onChange={handleChange}
//               />
//               {/* Toggle password visibility */}
//               {inputs.showPassword ? (
//                 <FiEyeOff onClick={togglePasswordVisibility} />
//               ) : (
//                 <FiEye onClick={togglePasswordVisibility} />
//               )}
//             </div>
//             {err && <p className="error-message">{err}</p>}
//             <button onClick={handleLogin}>Login</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
