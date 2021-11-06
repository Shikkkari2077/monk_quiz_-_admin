import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <ul>
          <li>
            <Link className="links" exact to="/">
              <img src="/img/instagram.svg" alt="" />
              <span>Instagram</span>
            </Link>
          </li>
          <li>
            <Link className="links" exact to="/">
              <img src="/img/facebook.svg" alt="" />
              <span>Facebook</span>
            </Link>
          </li>
          <li>
            <Link className="links" exact to="/">
              <img src="/img/gmail.svg" alt="" />
              <span>Gmail</span>
            </Link>
          </li>
          <li>
            <Link className="links" exact to="/">
              <img src="/img/twitter.svg" alt="" />
              <span>Twitter</span>
            </Link>
          </li>
          <li>
            <Link className="links" exact to="/">
              <img src="/img/linkedin.svg" alt="" />
              <span>LinkedIn</span>
            </Link>
          </li>
        </ul>
        <span className="copyright">
          Copyright © 2020. All rights reserved by <span className='flogo'>Monk Corporation.</span>
        </span>
      </footer>
    </>
  );
};

export default Footer;
