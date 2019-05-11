import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = props => (
   <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Users</NavigationItem>
        { props.isAuth ? <>
            <NavigationItem link="/mytasks" >Tasks</NavigationItem>
            <NavigationItem link="/logout" clicked={props.logoutHandler}>Logout</NavigationItem>
            <NavigationItem link="/me">Me</NavigationItem>
            </>
            : <>
            <NavigationItem link="/login" clicked={props.loginHandler}>Login</NavigationItem>
            <NavigationItem link="/register">Signup</NavigationItem></>
        }
        
   </ul>
);

export default navigationItems;