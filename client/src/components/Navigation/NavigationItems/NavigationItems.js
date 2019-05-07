import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => (
   <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Users</NavigationItem>
        <NavigationItem link="/tasks" >My tasks</NavigationItem>
        <NavigationItem link="/login">Login</NavigationItem>
        <NavigationItem link="/logout">logout</NavigationItem>
        <NavigationItem link="/register">register</NavigationItem>
   </ul>
);

export default navigationItems;