import React from "react";
import Input from "../../../components/UI/Input/Input";
import classes from "./Register.module.css";
import Button from "../../../components/UI/Button/Button";
// import { post } from "../../../api/callApi";
class Register extends React.Component {
  state = {
    registerForm: {
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

  // callApiUpdateUser = data => {
  //   post(data)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(e => {});
  // };

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

  checkAuthTimeout = (expirationTime) => {
    return setTimeout(() => {
      localStorage.clear();
    },expirationTime);
  }

  registerHandler = async (event) => {
    event.preventDefault();
    //fetch data in here
    const email = this.state.registerForm.email.value;
    const password = this.state.registerForm.password.value;
    const name = this.state.registerForm.name.value;
    const age = this.state.registerForm.age.value;

    const newUser = {
      email: email,
      password: password,
      name: name,
      age: age
    };

    const data = await fetch("http://localhost:5000/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    const resData = await data.json();
    console.log(resData);
    if (resData.error) {
      this.setState({ errorMessage: resData.error });
    }
    localStorage.setItem("token", resData.token);
    this.props.history.push("/");
    this.checkAuthTimeout(3600000);
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
    updatedRegisterForm[inputIndentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIndentifier in updatedRegisterForm) {
      formIsValid = updatedRegisterForm[inputIndentifier].valid && formIsValid;
    }
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
    let form = formElementsArray.map(formElement => (
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
    ));
    return (
      <div className={classes.Register}>
        <form onSubmit={(event) => this.registerHandler(event)}>
          <h2 style={{ textAlign: "center" }}>Register</h2>
          {form}
          {errorMessage}
          <Button disabled={!this.state.formIsValid} btnType="Success">
            Register
          </Button>
        </form>
      </div>
    );
  }
}
export default Register;
