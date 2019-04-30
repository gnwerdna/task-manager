import React from "react";
import FormGroup from "../FormGroup/FormGroup";
import classes from "./Register.module.css";
import Button from "../../../components/UI/Button/Button";
class Register extends React.Component {
  render() {
    return (
      <div className={classes.Register}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <form>
          <FormGroup label="Name" placeholder="Your name" name="name" />
          <FormGroup
            label="Email"
            type="email"
            placeholder="Email"
            name="email"
          />
          <FormGroup
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
          />
          <FormGroup
            label="Confirm Password"
            placeholder="Confirm password"
            name="password2"
            type="password"
          />
          <FormGroup
            type="number"
            label="Age"
            placeholder="Your age"
            name="age"
          />
          <Button btnType="Success">Register</Button>
          <Button>Cancel</Button>
        </form>
      </div>
    );
  }
}
export default Register;
