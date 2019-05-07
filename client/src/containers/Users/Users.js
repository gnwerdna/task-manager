import React from 'react'
import User from '../../components/User/User'
import classes from './Users.module.css';
class Users extends React.Component {
  state = {
    users: null
  }

  componentDidMount() {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(resData => {
        this.setState({users: resData})
      });
  }
  render() {
    let users = null;
    if(this.state.users) {
      users = this.state.users.map(user => <User key={user._id} user={user}/>)
    }
    return<div className={classes.Users}>{users}</div>;
  }
}

export default Users