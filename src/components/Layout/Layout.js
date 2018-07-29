import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Content = styled.main`
  margin-top: 72px;
`;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
    this.drawerToggleClicked = this.drawerToggleClicked.bind(this);
    this.state = {
      showSideDrawer: true,
    };
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false });
  }

  drawerToggleClicked() {
    const { showSideDrawer } = this.state;
    const drawerVisible = showSideDrawer;
    this.setState({ showSideDrawer: !drawerVisible });
  }

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleClicked} />
        <SideDrawer
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <Content>
          {children}
        </Content>
      </Aux>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Layout;
