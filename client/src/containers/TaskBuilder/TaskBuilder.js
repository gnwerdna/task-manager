import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";
import Task from "../../components/Task/Task";
import EditTask from "../../components/Task/EditTask/EditTask";
class TaskBuilder extends React.Component {
  state = {
    isShowBackdrop: false,
    isCompleted: false
  };

  openModalHandler = () => {
    this.setState({ isShowBackdrop: true });
  };

  closeModalHandler = () => {
    this.setState({ isShowBackdrop: false });
  };

  toggleModalHandler = () => {
    this.setState(prevState => {
      return { isShowBackdrop: !prevState.isShowBackdrop };
    });
  };

  completeHandler = () => {
    this.setState(prevState => {
      return { isCompleted: !prevState.isCompleted };
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
          <EditTask cancelClicked={this.closeModalHandler} />
        </Modal>
        <Task
          completed={this.completeHandler}
          showModal={this.openModalHandler}
          isCompleted={this.state.isCompleted}
        >
          askjdkajsd
        </Task>
      </Aux>
    );
  }
}

export default TaskBuilder;
