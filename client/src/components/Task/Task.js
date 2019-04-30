import React from "react";
import classes from "./Task.module.css";
import Icons from "./Icons/Icons";
class Task extends React.Component {
  render() {
    return (
      <div className={classes.Task}>
        <div
          onClick={this.props.completed}
          className={this.props.isCompleted ? classes.CompletedTask : ""}
        >
          {this.props.children}
        </div>
        <div>
          <Icons showModal={this.props.showModal} />
        </div>
      </div>
    );
  }
}

export default Task;
