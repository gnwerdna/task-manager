import React from 'react'
import classes from './FormGroup.module.css'

class FormGroup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        password2: '',
        avatar: null,
        age: ''
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    render() {
        return (
            <div className={classes.FormGroup}>
                <label className={classes.Label}><strong>{this.props.label}</strong></label>
                <input 
                    type={this.props.type}
                    className={classes.Input}
                    name={this.props.name} 
                    placeholder={this.props.placeholder}
                    value={this.state[this.props.name]}
                    onChange={this.handleChange}/>
            </div>
        );
    }
}

export default FormGroup