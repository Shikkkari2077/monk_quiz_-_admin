import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Confirm from "./Confirm";
import "./LogIn.css";

const LogIn = () => {
  let history = useHistory();
 
  useEffect(() => {
    document.title='Log In'
  }, [])
  const [isLogin, setIsLogin] = useState(false);
  const [logn, setLogn] = useState({
    email: "",
    password: "",
  });
  const [logData, setLogData] = useState([
    {
      fname: "xyz",
      username: "x_y_Z",
      email: "example@mail.com",
      password: "123456",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogn({
      ...logn,
      [name]: value,
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    setErrors(() => {
      let err = {};

      //Email
      if (!logn.email) {
        err.email = "Email required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(logn.email)) {
        err.email = "Email address is invalid";
      }

      //password
      if (!logn.password) {
        err.password = "Password is required";
      } else if (logn.password.length < 6) {
        err.password = "Password needs to be 6 characters or more";
      }

      return err;
    });

    setIsSubmitting(true);
  };

  useEffect(async () => {
    if (Object.keys(errors).length == 0 && isSubmitting) {
      const result = await axios.get(
        `http://localhost:3009/schema?email=${logn.email}`
      );
      if (!result.data.length == 0) {
        setLogData(result.data);
      } else {
        setLogData(logData);
      }
    }
    
  }, [errors]);
  console.log(logData);

  if (logData[0].email == logn.email && logData[0].password == logn.password) {
    let Email = logData[0].email;
    let Password = logData[0].password;
    let Fname = logData[0].fname;
    let UserName = logData[0].username;

    localStorage.setItem("Email", Email);
    localStorage.setItem("Password", Password);
    localStorage.setItem("Fname", Fname);
    localStorage.setItem("UserName", UserName);
    window.location.reload()
  }

  const authEmail = localStorage.getItem("Email");
  const authPass = localStorage.getItem("Password");
  const Guest = localStorage.getItem("Fname");
  const UName = localStorage.getItem("UserName");
  return (
  <>
    {/* <Navbar Guest={Guest} UName={UName}/> */}
    <div className="logInPage">
      <div className="log-Left">
        <img className="log-img" src="/img/login.jpg" alt="" />
      </div>
      <div className="log-right">
        <h1>log in</h1>
        {authEmail && authPass ? (
          <Confirm />
        ) : (
          <form onSubmit={loginSubmit} className="log-form">
            <div className="formInputs">
              <label htmlFor="email" className="l-label">
                E-mail ID
              </label>
              <input
                type="text"
                name="email"
                className="inputl"
                placeholder="Enter registered email id"
                value={logn.email}
                onChange={handleChange}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <div className="formInputs">
              <label htmlFor="password" className="l-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="inputl"
                placeholder="Enter your password"
                value={logn.password}
                onChange={handleChange}
              />
              {errors.password && <p>{errors.password}</p>}
            </div>
            <div className="sign-up">
              <button  type="submit" className="SignUpBtn">
                Log In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
    </>
  );
};

export default LogIn;
