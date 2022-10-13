import React, { useState } from "react";
import "./cssFiles/Login.css";
import { Button_Register } from "../MPComponents/Button";
import axios from "axios";

export default function Login(props) {
  const [inputs, setInput] = useState({});
  const [output, setOutput] = useState("");

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const validateForm = () => {
    var mailformat = /\S+@\S+\.\S+/;
    var valid = false;
    if (!inputs.email || !inputs.password) {
      setOutput("Validation failure: Please fill in all text fields.");
    } else if (!mailformat.test(inputs.email)) {
      setOutput(
        "Validation failure: Invalid e-mail address. Please enter your e-mail again."
      );
    } else if (inputs.password.length < 8) {
      setOutput(
        "Validation failure: Password is too short. Please enter your password"
      );
    } else {
      valid = true;
    }
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataLogin = { email: inputs.email, password: inputs.password };

    console.log(dataLogin);

    if (validateForm()) {
      axios({
        method: "post",
        url: "http://localhost:8080/signin",
        data: dataLogin,
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setOutput("Login success");
            const jwtToken = response.headers.authorization.split(" ")[1];
            if (jwtToken !== null) {
              sessionStorage.setItem("jwt", jwtToken);
              console.log(jwtToken);
              props.setLoggedinUser(inputs.email);
            } else {
              setOutput("Token failure");
              props.setLoggedinUser("");
            }
          } else {
            setOutput("Login failure");
            props.setLoggedinUser("");
          }
        })
        .catch((err) => {
          console.log(err.response);
          setOutput("Login failure");
          props.setLoggedinUser("");
        });
    }
  };

  return (
    <>
      <div className="user">
        <header className="page_header_logo">
          <h1 className="page_title">Sign In</h1>
        </header>
        <form className="Login-form" onSubmit={handleSubmit} noValidate>
          <div className="sign-in-form">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="sign-in-form">
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className="buttonbg">
            <input className="signinbutton" type="submit" />
          </div>
          <p className="sign-upmessage">Don't have an account? Sign Up!</p>
          <div className="signupbut">
            <Button_Register className="btn-mobile" value="Donate Food">
              {" "}
              Sign Up
            </Button_Register>
          </div>
        </form>
        <div className="center">
          <p>{output}</p>
        </div>
      </div>
    </>
  );
}
