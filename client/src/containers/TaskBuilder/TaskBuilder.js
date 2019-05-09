import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Task from "../../components/Task/Task";
import Modal from "../../components/UI/Modal/Modal";
import EditTask from "../../components/Task/EditTask/EditTask";
import AddTask from "../../components/AddTask/AddTask";
import { BASE_URL } from "../../constant/abstract";
class TaskBuilder extends React.Component {
  state = {
    isShowBackdrop: false,
    isCompleted: false,
    tasksData: [],
    temporaryValue: {},
    newTask: {
      description: ""
    },
    taskDescription: ""
  };

  handleAddTask = async () => {
    const task = {
      description: this.state.newTask.description
    };
    const data = await fetch(BASE_URL + "/me/task", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(task)
    });
    const resData = await data.json();
    this.state.tasksData.push(resData.task);
    if (resData.err) {
      this.setState({ errorMessage: resData.err });
    } else {
      this.props.history.push("/mytasks");
    }
  };

  onChangeAddTaskInput = value => {
    const newTask = { ...this.state.newTask };
    newTask.description = value;

    this.setState({ newTask: newTask });
  };

  componentWillMount() {
    fetch(BASE_URL + "/tasks", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(resData => {
        this.setState({ tasksData: resData.tasks });
      });
  }

  openModalHandler = index => {
    const tasksData = [...this.state.tasksData];
    const temporaryValue = tasksData[index];
    temporaryValue["index"] = index;
    this.setState({
      temporaryValue: temporaryValue,
      isShowBackdrop: true
    });
  };

  handleDeleteTask = async (id, index) => {
    const data = await fetch(BASE_URL + "/tasks/" + id, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token")
      }
    });
    const resData = await data.json();
    const newTaskData = [...this.state.tasksData];
    newTaskData.splice(index, 1);
    this.setState({ tasksData: newTaskData });
    if (resData.error) {
      console.log(resData.error);
    }
  };

  closeModalHandler = event => {
    event.preventDefault();
    this.setState({ isShowBackdrop: false });
  };

  toggleModalHandler = () => {
    this.setState(prevState => {
      return { isShowBackdrop: !prevState.isShowBackdrop };
    });
  };

  handleChangeInput = value => {
    // const tasksData = [...this.state.tasksData];
    // const updateTask = tasksData[index];
    // updateTask.description = value;
    this.setState({ taskDescription: value });
  };

  onSaveUpdateData = async () => {
    const temporaryValue = { ...this.state.temporaryValue };
    const value = this.state.taskDescription;
    const id = temporaryValue._id;
    const index = temporaryValue.index;
    console.log(index, value, id);
    try {
      const data = await fetch(BASE_URL + "/tasks/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          // "Access-Control-Allow-Method": "PATCH",
          Accept: "application/json"
        },
        body: JSON.stringify({ description: value })
      });
      const resData = await data.json();
      const updateData = [...this.state.tasksData];
      updateData[index] = resData;
      
      if (resData.error) {
        console.log(resData.error);
      } else {
        this.setState({ tasksData: updateData, isShowBackdrop: false });
      }
    } catch (e) {
      console.log("cannot fetch");
    }
  };

  completeHandler = taskId => {
    const tasks = [...this.state.tasksData];
    // console.log(tasks[taskId]);
    tasks[taskId].complete = !tasks[taskId].complete;
    // const updateTask = {...tasks["taskId"]}
    this.setState({ tasksData: tasks });
  };

  render() {
    let tasks = [];
    if (this.state.tasksData.length) {
      tasks = this.state.tasksData.map((task, index) => (
        <Task
          key={index}
          completed={() => this.completeHandler(index)}
          showModal={() => this.openModalHandler(index)}
          isCompleted={task.complete}
          deleteTask={() => this.handleDeleteTask(task._id, index)}
          taskDescription={() =>
            this.setState({ taskDescription: task.description })
          }
        >
          {task.description}
        </Task>
      ));
    }

    return (
      <Aux>
        <AddTask
          newTaskValue={this.state.newTask.description}
          onChangeHandler={value => this.onChangeAddTaskInput(value)}
          onAddNewTask={this.handleAddTask}
        />
        <Modal
          showModal={this.state.isShowBackdrop}
          closeModal={this.closeModalHandler}
          modalToggle={this.toggleModalHandler}
        >
          <EditTask
            handleChangeInput={value => this.handleChangeInput(value)}
            // taskValue={props.taskValue}
            onSaveData={this.onSaveUpdateData}
            taskDescription={this.state.temporaryValue.description}
            cancelClicked={this.closeModalHandler}
          />
        </Modal>
        {tasks}
      </Aux>
    );
  }
}

export default TaskBuilder;
