import React from "react";
import classes from "./Toolbar.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../Toolbar/DrawerToggle/DrawerToggle";
const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle toggleClicked={props.sideDrawerToggleClicked}/>
    <div>
      <div className={classes.Home}>TASKS MANAGER</div>
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} logoutHandler={props.logoutHandler}/>
    </nav>
  </header>
);

export default toolbar;
