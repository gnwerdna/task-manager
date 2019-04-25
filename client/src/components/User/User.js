import React from 'react'
import classes from './User.module.css'

const user = props => (
    <div className={classes.User}>
        <div>
            <img className={classes.Avatar} alt="avatar" src="https://picsum.photos/200"/>
        </div>
        <div className={classes.UserInfo}>
            <div className={classes.Name}>Name</div>
            <div className={classes.Email}><i>Email</i></div>
        </div>
    </div>
)

export default user;