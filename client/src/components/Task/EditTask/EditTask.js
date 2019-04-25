import React from "react";
import classes from "./EditTask.module.css";
import Button from "../../UI/Button/Button";
const editTask = props => (
  <form>
    <div>
      <input className={classes.Input} placeholder="edit task" />
    </div>
    <div>
      <Button btnType="Success">Save</Button>
      <Button clicked={props.cancelClicked}>Cancel</Button>
    </div>
  </form>
);

export default editTask;
