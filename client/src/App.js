import React from "react";
import Task from "./components/Task/Task";
import Layout from "./hoc/Layout/Layout";
import TaskBuilder from "./containers/TaskBuilder/TaskBuilder";
import User from "./components/User/User";
import Register from './containers/Auth/Register/Register';
function App() {
  return (
    <div className="App">
      <Layout>
        {/* <TaskBuilder/> */}
        <TaskBuilder/>
      </Layout>
    </div>
  );
}

export default App;
