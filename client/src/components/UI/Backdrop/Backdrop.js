import React from "react";
import classes from "./Backdrop.module.css";

const backdrop = props =>
  props.showBackdrop ? (
    <div onClick={props.backdropClicked} className={classes.Backdrop} />
  ) : (
    ""
  );

export default backdrop;
