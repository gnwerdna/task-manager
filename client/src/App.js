import React from "react";
import Task from "./components/Task/Task";
import Layout from "./hoc/Layout/Layout";
import TaskBuilder from "./containers/TaskBuilder/TaskBuilder";
import User from "./components/User/User";
import Users from './containers/Users/Users';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/mytasks" component={TaskBuilder}/>
          <Route path="/" exact component={Users}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
