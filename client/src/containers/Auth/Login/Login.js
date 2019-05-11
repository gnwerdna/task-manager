import React from "react";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import classes from "./Login.module.css";
import { BASE_URL} from '../../../constant/abstract'
class Login extends React.Component {
  state = {
    loginForm: {
      email: {
        elementConfig: {
          type: "email",
          placeholder: "Email"
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
      }
    },
    formIsValid: false,
    errorMessage: null
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
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

  inputChangedHandler = (event, formIndentifier) => {
    const updatedLoginForm = { ...this.state.loginForm };
    const updatedFormElement = { ...updatedLoginForm[formIndentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedLoginForm[formIndentifier] = updatedFormElement;

    let formIsValid = true;
    for (let formIndentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[formIndentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
  };

  checkAuthTimeout = exprirationTime => {
    return setTimeout(() => {
      localStorage.clear();
    }, exprirationTime);
  };

  handleSubmit = async event => {
    event.preventDefault();
    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;
    const authData = {
      email: email,
      password: password
    };
    const data = await fetch(BASE_URL + "/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authData)
    });
    const resData = await data.json();
    if (resData.error) {
      this.setState({ errorMessage: resData.error });
    } else {
      localStorage.setItem("token", resData.token);
      this.props.history.push("/");
      this.checkAuthTimeout(3600000);
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key]
      });
    }

    const form = (
      <form onSubmit={this.handleSubmit}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            shouldValidation={formElement.config.validation.required}
            inValid={!formElement.config.valid}
            touched={formElement.config.touched}
            label={formElement.id}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          Login
        </Button>
      </form>
    );
    return (
      <div className={classes.Login}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        {form}
      </div>
    );
  }
}

export default Login;
