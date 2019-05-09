import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => (
   <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Users</NavigationItem>
        <NavigationItem link="/mytasks" >Tasks</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
        <NavigationItem link="/register">Signup</NavigationItem>
        <NavigationItem link="/me">Me</NavigationItem>
   </ul>
);

export default navigationItems;