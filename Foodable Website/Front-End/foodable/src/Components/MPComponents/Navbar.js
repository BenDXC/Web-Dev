import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
import "./Navbar.css";

export default function Navbar(props) {
  const loggedInUser = props.loggedInUser;
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    if (loggedInUser !== "") {
      const jwt = sessionStorage.getItem("jwt");
      console.log(jwt);

      axios({
        method: "get",
        url: "/user",
        params: { email: loggedInUser },
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            if (response.data.addresses)
              setUserdata(JSON.stringify(response.data.addresses[0]));
          }
        })
        .catch((err) => {
          console.log(err.response);
          setUserdata("Data failure");
        });
    }
  }, [loggedInUser]);

  console.log(loggedInUser);
  if (loggedInUser === "") {
    return NavbarD();
  } else {
    return NavbarR();
  }
}

function NavbarR() {
  const [click, SetClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => SetClick(!click);
  const closeMobileMenu = () => SetClick(false);

  const showButton = () => {
    if (Window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="./Img/foodablemain.jpg"></img>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Receiver"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Receiver
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Registration"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Signup
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Login</Button>}
        </div>
      </nav>
    </>
  );
}
function NavbarD() {
  const [click, SetClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => SetClick(!click);
  const closeMobileMenu = () => SetClick(false);

  const showButton = () => {
    if (Window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);
  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="./Img/foodablemain.jpg"></img>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-links" onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Donator"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Donator
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Registration"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Signup
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline">Login</Button>}
        </div>
      </nav>
    </>
  );
}
