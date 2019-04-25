import React from "react";
import classes from "./Icon.module.css";

const icon = props => (
  <li
    onClick={props.clicked}
    className={[classes.Icon, classes[props.iconType]].join(" ")}
  >
    {props.children}
  </li>
);

export default icon;
