import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import Task from '../../components/Task/Task';
import EditTask from "../../components/Task/EditTask/EditTask";
class TaskBuilder extends React.Component {
  state = {
    isShowBackdrop: false
  };

  openModalHandler=() => {
    this.setState({isShowBackdrop: true})
  }

  closeModalHandler = () => {
    this.setState({ isShowBackdrop: false });
  };

  toggleModalHandler = () => {
    this.setState(prevState => {
      return { isShowBackdrop: !prevState.isShowBackdrop };
    });
  };

  render() {
    return (
      <Aux>
        <Modal
          showModal={this.state.isShowBackdrop}
          closeModal={this.closeModalHandler}
          modalToggle={this.toggleModalHandler}
        >
          <EditTask cancelClicked={this.closeModalHandler}/>
        </Modal>
        <Task showModal={this.openModalHandler}>askjdkajsd</Task>
      </Aux>
    );
  }
}

export default TaskBuilder;
