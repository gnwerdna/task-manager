import React from "react";
import Aux from "../Aux/Aux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
class Layout extends React.Component {
  state = {
    showSideDrawer: false,
    isAuthenticated: false
  };

  componentWillMount() {
    const token = localStorage.getItem("token");
    if(token) {
      this.setState({ isAuthenticated: true});
    } else {
      this.setState({ isAuthenticated: false});
    }
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  loginHandler=() => {
    this.setState({ isAuthenticated: true});
  }

  logoutHandler=() => {
    this.setState({ isAuthenticated: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar 
          isAuth={this.state.isAuthenticated}
          loginHandler={this.loginHandler}
          logoutHandler={this.logoutHandler}
          sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
            open={this.state.showSideDrawer}
            close={this.sideDrawerCloseHandler} />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
