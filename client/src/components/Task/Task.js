import React from "react";
import classes from "./Task.module.css";
import Icons from "./Icons/Icons";
const task = props => (
  <div className={classes.Task}>
    <div>{props.children}</div>
    <div>
      <Icons showModal={props.showModal}/>
    </div>
  </div>
);

export default task;
