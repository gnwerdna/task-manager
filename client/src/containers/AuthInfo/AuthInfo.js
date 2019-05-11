import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./AuthInfo.module.css";
import { BASE_URL } from "../../constant/abstract";
import axios from "axios";
import Aux from "../../hoc/Aux/Aux";
import img from '../../assets/images/1557471586968-alcohol-architecture.jpg'
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
    avatar: null,
    errorMessage: null,
    formIsValid: true
  };

  componentWillMount() {
    fetch(BASE_URL + "/users/me", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(resData => {
        const myData = this.state.AuthInfo;
        const user = resData.user[0];

        for (let i in user) {
          if (myData[i]) {
            myData[i].value = user[i];
          }
        }
        this.setState({ AuthInfo: myData, avatar: user.avatar });
      });
  }

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

  onUpdateInfoHandler = async () => {
    let newInfo = {};
    const myInfo = this.state.AuthInfo;
    for (let i in myInfo) {
      newInfo[i] = myInfo[i].value;
    }
    const data = await fetch(BASE_URL + "/users/me", {
      method: "PATCH",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newInfo)
    });
    this.props.history.push("/");
  };

  inputChangedHandler = (event, inputIndentifier) => {
    const updatedAuthForm = {
      ...this.state.AuthInfo
    };
    const updatedFormElement = { ...updatedAuthForm[inputIndentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    let formIsValid = true;
    for (let inputIndentifier in updatedAuthForm) {
      formIsValid = updatedAuthForm[inputIndentifier].valid && formIsValid;
    }
    updatedAuthForm[inputIndentifier] = updatedFormElement;
    this.setState({
      AuthInfo: updatedAuthForm,
      formIsValid: formIsValid
    });
  };

  onUploadAvatar = async () => {
    const data = new FormData();
    data.append("myImage", this.state.avatar);
    const resData = await axios.post(BASE_URL + "/users/me/avatar", data, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    console.log(resData);
    // const resDataJson = resData.json();
    this.setState({avatar: resData.data.user})
  };

  onPostAvatar = event => {
    let file = event.target.files[0];
    this.setState({ avatar: file });
  };

  render() {
    let formElementsArray = [];
    for (let key in this.state.AuthInfo) {
      formElementsArray.push({
        id: key,
        config: this.state.AuthInfo[key]
      });
    }
    let errorMessage = null;
    if (this.state.errorMessage) {
      errorMessage = <p style={{ color: "red" }}>{this.state.errorMessage}</p>;
    }
    let form = (
      <Aux>
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
        <Button
          // disabled={!this.state.formIsValid}
          clicked={this.onUpdateInfoHandler}
          btnType="Success"
        >
          Save
        </Button>
      </Aux>
    );
    let image = process.env.PUBLIC_URL+"/images/anh.jpg";
    if(this.state.avatar) {
      image = process.env.PUBLIC_URL+"/images/"+this.state.avatar;
    }
    return (
      <div className={classes.AuthInfo}>
        <h2 style={{ textAlign: "center" }}>Your information</h2>
        <div className={classes.MainContent}>
          <div>{form}</div>
          <div className={classes.Avatar}>
            <div className={classes.UploadAvatar}>
              <img
                // src={img}
                src={image}
                width="300px"
                height="300px"
                alt="avatar"
              />
              <input type="file" name="myImage" onChange={this.onPostAvatar} />
            </div>
            <Button clicked={this.onUploadAvatar} btnType="Info">
              Change avatar
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthInfo;
