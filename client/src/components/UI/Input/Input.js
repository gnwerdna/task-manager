import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputClass = [classes.InputElement];
  let validationError = null;
//   console.log(props.inValid);
//   console.log(props.shouldValidation);
//   console.log(props.touched);
  if (props.inValid && props.shouldValidation && props.touched) {
    inputClass.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>Please enter a valid value!</p>
    );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label} style={{ textTransform: "capitalize" }}>
        {props.label === "password2" ? "confirm password" : props.label}
      </label>
      <input
        value={props.value}
        className={inputClass.join(" ")}
        onChange={props.changed}
        {...props.elementConfig}
      />
      {validationError}
    </div>
  );
};

export default input;
