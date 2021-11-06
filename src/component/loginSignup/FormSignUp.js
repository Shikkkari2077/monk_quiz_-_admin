import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

import "./Form.css";

const FormSignUp = ({ submitForm }) => {
  const [values, setValues] = useState({
    fname:"",
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(() => {
      let err = {};

      if (!values.fname) {
        err.fname = "Fullname required";
      }

      if (!values.username.trim()) {
        err.username = "Username required";
      }

      //Email
      if (!values.email) {
        err.email = "Email required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        err.email = "Email address is invalid";
      }

      //password
      if (!values.password) {
        err.password = "Password is required";
      } else if (values.password.length < 6) {
        err.password = "Password needs to be 6 characters or more";
      }

      //confirm Password
      if (!values.password2) {
        err.password2 = "Password is required";
      } else if (values.password2 !== values.password) {
        err.password2 = "Password do not match";
      }
      return err;
    });

    setIsSubmitting(true);
  };

  useEffect(async () => {
    if (Object.keys(errors).length == 0 && isSubmitting) {
      submitForm();
      //Data Post request implement here
      console.log(values);
      await axios.post("http://localhost:3009/schema", values);
    }
  }, [errors]);

  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label htmlFor="fname" className="form-label">
            Full Name
          </label>
          <input
            id="fname"
            type="text"
            name="fname"
            className="form-input"
            placeholder="Enter your full name"
            value={values.fname}
            onChange={handleChange}
          />
          {errors.fname && <p>{errors.fname}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label htmlFor="password2" className="form-label">
            Confirm Password
          </label>
          <input
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <Link exact to='/login'>here</Link>
        </span>
      </form>
    </div>
  );
};

export default FormSignUp;
