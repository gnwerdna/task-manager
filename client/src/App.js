import React from "react";
import Layout from "./hoc/Layout/Layout";
import TaskBuilder from "./containers/TaskBuilder/TaskBuilder";
import AuthInfo from './containers/AuthInfo/AuthInfo';
import Users from './containers/Users/Users';
import Register from './containers/Auth/Register/Register';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import { Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/register" component={Register}/>
          <Route path="/mytasks" component={TaskBuilder}/>
          <Route path="/me" component={AuthInfo}/>
          <Route path="/" exact component={Users}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
