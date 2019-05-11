import React from "react";
import AvatarModal from "./AvatarModal/AvatarModal";
import classes from "./User.module.css";

class User extends React.Component {
  state = {
    showModal: false
  };

  showModalHandler = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };
  render() {
    let image = process.env.PUBLIC_URL+"/images/anh.jpg";
    if(this.props.user.avatar) {
      image = process.env.PUBLIC_URL+"/images/"+this.props.user.avatar;
    }
    return (
      <div className={classes.User}>
        <div>
          <AvatarModal
            src={image}
            showModal={this.state.showModal}
            modalToggle={this.showModalHandler}
          />
        </div>
        <div className={classes.UserInfo}>
          <div className={classes.Name}>{this.props.user.name}</div>
          <div className={classes.Email}>
            <i>{this.props.user.email}</i>
          </div>
        </div>
      </div>
    );
  }
}

export default User;
