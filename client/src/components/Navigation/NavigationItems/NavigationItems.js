import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => (
   <ul className={classes.NavigationItems}>
        <NavigationItem>users</NavigationItem>
        <NavigationItem>Login</NavigationItem>
        <NavigationItem>logout</NavigationItem>
   </ul>
);

export default navigationItems;