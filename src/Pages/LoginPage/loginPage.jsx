import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../Components/CustomBtn/customBtn.component";
import FormInput from "../../Components/FormInput/formInput.component";
import { useAuth } from "../../Contexts/authContext";
import "./loginPage.style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { dispatch } = useAuth();

  const loginHandler = async (e) => {
    console.log({ username, password });
    e.preventDefault();
    if (username === "foo" && password === "bar") {
      dispatch({ user: { username, password } });
      navigate("/");
    } else {
      alert("Login Details Incorrect");
    }
  };

  return (
    <div className="login-box">
      <div className="login-head">Login</div>
      <div className="login-subhead">
        Please enter your username and password.
      </div>
      <form onSubmit={loginHandler} className="login-form-box">
        <FormInput
          label="Username"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <FormInput
          label="Password"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <CustomButton
          type="submit"
          label="LOGIN"
          inverse={true}
          style={{ width: "150px" }}
        />
      </form>
    </div>
  );
};

export { Login };
