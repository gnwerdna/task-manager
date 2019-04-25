import React from "react";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import classes from "./SideDrawer.module.css";
const sideDrawer = props => {
  let attachClass = [classes.SideDrawer, classes.Close].join(" ");
  if (props.open) {
    attachClass = [classes.SideDrawer, classes.Open].join(" ");
  }
  return (
    <Aux>
      <Backdrop showBackdrop={props.open} backdropClicked={props.close} />
      <div className={attachClass}>
        <div>
          <div>TASKS MANAGER</div>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
