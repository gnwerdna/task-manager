import React from "react";
import classes from "./AddTask.module.css";

const addTask = props => (
  <div className={classes.AddTask} style={{display: "flex"}}>
      <div style={{ margin: "auto", width: "100%", display: "inherit" }}>
        <input
          type="text"
          name="task"
          placeholder="Task's name"
          className={classes.Input}
          value={props.newTaskValue}
          onChange={event => props.onChangeHandler(event.target.value)}
        />
        <button className={classes.Button} onClick={props.onAddNewTask}>Add</button>
      </div>
  </div>
);

export default addTask;
