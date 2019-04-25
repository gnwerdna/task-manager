import React from "react";
import Aux from "../Aux/Aux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

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
        <Toolbar sideDrawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
            open={this.state.showSideDrawer}
            close={this.sideDrawerCloseHandler} />
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
