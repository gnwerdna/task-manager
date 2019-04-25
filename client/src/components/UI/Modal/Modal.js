import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./Modal.module.css";
const modal = props => (
  <Aux>
    <Backdrop
      showBackdrop={props.showModal}
      backdropClicked={props.modalToggle}
    />
    <div
      className={classes.Modal}
      style={{
        transform: props.showModal ? "translateY(0)" : "translateY(-1000vh)"
      }}
    >
      {props.children}
    </div>
    ;
  </Aux>
);

export default modal;
