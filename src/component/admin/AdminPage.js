import axios from "axios";
import { React, useState, useEffect } from "react";
import "./AdminLogIn.css";
import { Link, NavLink, useHistory } from "react-router-dom";
import DataSupply from "./DataSupply";


const AdminPage = () => {
  useEffect(() => {
    document.title='Admin'
  }, [])
  let history=useHistory();
  const [isLogin, setIsLogin] = useState(false);
  const [logn, setLogn] = useState({
    email: "",
    password: "",
  });
  const [logData, setLogData] = useState([
    {
      afname: "xyz",
      ausername: "x_y_Z",
      aemail: "example@mail.com",
      apassword: "123456",
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
        `http://localhost:3009/admin?aemail=${logn.email}`
      );
      if (!result.data.length == 0) {
        setLogData(result.data);
      } else {
        setLogData(logData);
      }
    }
  }, [errors]);

  console.log(logData);

  if (
    logData[0].aemail == logn.email &&
    logData[0].apassword == logn.password
  ) {
    let Email = logData[0].aemail;
    let Password = logData[0].apassword;
    let Fname = logData[0].afname;
    let UserName = logData[0].ausername;

    localStorage.setItem("AEmail", Email);
    localStorage.setItem("APassword", Password);
    localStorage.setItem("AFname", Fname);
    localStorage.setItem("AUserName", UserName);
    window.location.reload();
    // history.push('/admin/students')
  }
  const adminEmail = localStorage.getItem("AEmail");
  const adminPass = localStorage.getItem("APassword");
//   const adminuser = localStorage.getItem("AUsername");
  return (
    <>
      {adminEmail && adminPass ? (
        <DataSupply />
      ) : (
        <div className="logINPage">
          <div className="log-RIGHT">
            <h1>Admin Panel</h1>
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
                <button type="submit" className="SignUpBTN">
                  Log In
                </button>
              </div>
            </form>
          </div>
          <div className="log-LEFT">
            <img className="log-IMG" src="/img/admin2.jpg" alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
