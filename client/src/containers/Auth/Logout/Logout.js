import React from 'react';
import { Redirect } from 'react-router-dom'
class Logout extends React.Component {
    componentDidMount() {
        fetch("/me/logout", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => localStorage.clear());
    }
    render() {
        return <Redirect to="/"/>
    }
}

export default Logout