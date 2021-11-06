import axios from "axios";
import { React, useState, useEffect } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  useEffect(() => {
    document.title='Contact Us'
  }, [])
  const [contact, setContact] = useState({
    fname: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:3009/contactUs', contact)
    setContact({
        fname: "",
        email: "",
        phone: "",
        message: "",
      })
  };

  return (
    <div className="contact-us">
      <div className="contact-head">
        <h1>Get in touch</h1>
        <span className="head-phn">
          <img src="/img/call.svg" alt="" />
          Phone: +(91) 914 9072 143
        </span>
        <span className="head-email">
          <img src="/img/email.svg" alt="" />
          E-mail:<span className="headEmail">monk.india@gmail.com</span>
        </span>
        <span className="head-address">
          <img src="/img/location.svg" alt="" />
          Address: Railway crossing, Ramnagar road, Kashipur (U.S.Nagar)
        </span>
      </div>
      <div className="ct-container">
        <div className="ct-left">
          <img className="ct-img" src="/img/contact-us.jpg" alt="" />
        </div>
        <div className="ct-right">
          <form onSubmit={onSubmit} className="ct-form">
            <h3>Contact us here</h3>
            <div className="ct-form-content">
              <div className="ct-inputs">
                <label htmlFor="fname" className="label">
                  Full Name:
                </label>
                <input
                  type="text"
                  name="fname"
                  className="ct-input"
                  placeholder="Enter your full name"
                  value={contact.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="ct-inputs">
                <label htmlFor="email" className="label">
                  E-mail Address:
                </label>
                <input
                  type="text"
                  name="email"
                  className="ct-input"
                  placeholder="Enter your email"
                  value={contact.email}
                  onChange={handleChange}
                />
              </div>
              <div className="ct-inputs">
                <label htmlFor="phone" className="label">
                  Contact No.:
                </label>
                <input
                  type="text"
                  name="phone"
                  className="ct-input"
                  placeholder="Enter your contact no"
                  value={contact.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="ct-inputs">
                <label htmlFor="message" className="label">
                  Message:
                </label>
                <textarea
                  type="text"
                  name="message"
                  className="ct-input-text"
                  placeholder="Enter your message"
                  value={contact.message}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="ctSubmit">
              <button type="submit" className="ct-submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
