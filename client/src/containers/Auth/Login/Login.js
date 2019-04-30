import React from "react";
import FormGroup from "../FormGroup/FormGroup";
import Button from "../../../components/UI/Button/Button";

import classes from "./Login.module.css";

class Login extends React.Component {
  render() {
    return (
      <div className={classes.Login}>
        <h2 style={{textAlign: "center"}}>Login</h2>
        <form>
          <FormGroup
            name="email"
            type="email"
            label="Email"
            placeholder="Email"
          />
          <FormGroup 
            name="password"
            type="password"
            label="Password"
            placeholder="Password"/>
            <Button btnType="Success">Login</Button>
            <Button>Cancel</Button>
        </form>
      </div>
    );
  }
}

export default Login;
