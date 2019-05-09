import React from "react";
import classes from "./EditTask.module.css";
import Button from "../../UI/Button/Button";
import Aux from "../../../hoc/Aux/Aux";
const editTask = props => {
  const { onSaveData, taskDescription, cancelClicked } = props;
  return (
    <Aux>
      <div>
        <input
          className={classes.Input}
          placeholder={taskDescription}
          // value=""
          onChange={event => props.handleChangeInput(event.target.value)}
        />
      </div>
      <div>
        <Button btnType="Success" clicked={onSaveData}>
          Save
        </Button>
        <Button clicked={cancelClicked}>Cancel</Button>
      </div>
    </Aux>
  );
};

export default editTask;
