import React from "react";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import Button from "../../components/UI/Button/Button";
import classes from "./AuthInfo.module.css";

class AuthInfo extends React.Component {
  state = {
    AuthInfo: {
      name: {
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 8,
          maxLength: 32
        },
        valid: false,
        touched: false
      },
      age: {
        elementConfig: {
          type: "number",
          placeholder: "Your age",
          min: 18
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    errorMessage: null,
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIndentifier) => {
    const updatedRegisterForm = {
      ...this.state.registerForm
    };
    const updatedFormElement = { ...updatedRegisterForm[inputIndentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    let formIsValid = true;
    for (let inputIndentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIndentifier].valid && formIsValid;
    }
    updatedRegisterForm[inputIndentifier] = updatedFormElement;
    this.setState({
      registerForm: updatedRegisterForm,
      formIsValid: formIsValid
    });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.registerForm) {
      formElementsArray.push({
        id: key,
        config: this.state.registerForm[key]
      });
    }
    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = <p style={{ color: "red" }}>{this.state.errorMessage}</p>;
    }
    let form = (
      <form onSubmit={this.registerHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            label={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidation={formElement.config.validation.required}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        {errorMessage}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          Register
        </Button>
        <Button>Cancel</Button>
      </form>
    );
    return (
      <div className={classes.Register}>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        {form}
      </div>
    );
  }
}

export default AuthInfo;
