import React from "react";
import classes from "./Icons.module.css";
import Icon from "./Icon/Icon";

const icons = props => (
  <ul className={classes.Icons}>
    <Icon iconType="Warning" clicked={props.showModal}>
      <i className="fas fa-pen" />
    </Icon>
    <Icon iconType="Danger">
      <i className="fas fa-times" />
    </Icon>
  </ul>
);

export default icons;
