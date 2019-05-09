import React from "react";
import classes from "./Task.module.css";
import Icons from "./Icons/Icons";
import Aux from "../../hoc/Aux/Aux";
const task = props => (
  <Aux>
    <div className={classes.Task}> 
      <div
        onClick={props.completed}
        className={props.isCompleted ? classes.CompletedTask : ""}
      >
        {props.children}
      </div>
      <div>
        <Icons deleteTask={props.deleteTask} showModal={props.showModal} />
      </div>
    </div>
  </Aux>
); 

export default task;
