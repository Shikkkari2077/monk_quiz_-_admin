import { React, useState, useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  let history = useHistory();
  const [login, setLogin] = useState(false);
  const [alogin, setALogin] = useState(false);

  const GuestName = localStorage.getItem("Fname");
  const userName = localStorage.getItem("UserName");

  const AdminName = localStorage.getItem("AFname");
  const AdminUser = localStorage.getItem("AUserName");

  const [icon, setIcon] = useState(false);

  useEffect(() => {
    if (GuestName && userName) {
      setLogin(true);
    }
    if (AdminName && AdminUser) {
      setIcon(true);
      setALogin(true);
    }
  }, []);
  const clearStorage = () => {
    localStorage.clear();
    setLogin(false);
  };
  const clearAStorage = () => {
    localStorage.clear();
    setIcon(false);
    setALogin(false);
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">
          <Link className="Mlogo" exact to="/">
            MONK
          </Link>
        </div>

        <div className="nav-center">
          <ul className="nav-links">
            <li className="link-item">
              <Link className="ul-item" exact to="/">
                Home
              </Link>
            </li>
            <li className="link-item">
              <Link className="ul-item" exact to="/quiz">
                Quiz
              </Link>
            </li>
            <li className="link-item">
              <Link className="ul-item" exact to="/admin">
                Admin
              </Link>
            </li>
            <li className="link-item">
              <Link className="ul-item" exact to="/contact-us">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <div className="nav-auth">
            {alogin ? (
              <Link
                onClick={clearAStorage}
                className="btn login"
                exact
                to="/admin"
              >
                {alogin ? "Log Out" : "Log In"}
              </Link>
            ) : (
              <Link
                onClick={clearStorage}
                className="btn login"
                exact
                to="/login"
              >
                {login ? "Log Out" : "Log In"}
              </Link>
            )}
          </div>

          <div className="nav-user">
            <div>
              {icon ? (
                <img className="user-img" src="/img/adminlog.svg" alt="img" />
              ) : (
                <img className="user-img" src="/img/user.svg" alt="img" />
              )}
            </div>
            <div className="user-name">
              {AdminName ? (
                <span className="Afname">{AdminName ? AdminName : "Guest"}</span>
              ) : (
                <span className="fname">{GuestName ? GuestName : "Guest"}</span>
              )}
              {AdminUser ? (
                <span className="Auname">
                  @{AdminUser ? AdminUser : "username"}
                </span>
              ) : (
                <span className="uname">
                  @{userName ? userName : "username"}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
