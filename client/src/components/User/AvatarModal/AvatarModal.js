import React from "react";
import Modal from "../../UI/Modal/Modal";
import classes from "./AvatarModal.module.css";
const avatarModal = props => (
  <div>
    <Modal showModal={props.showModal} modalToggle={props.modalToggle} center>
      <img
        style={{ width: "200px", height: "200px" }}
        src={props.src}
        alt="avatar"
      />
    </Modal>
    <img
      onClick={props.modalToggle}
      className={classes.Avatar}
      src={props.src}
      alt="avatar"
    />
  </div>
);
export default avatarModal;
