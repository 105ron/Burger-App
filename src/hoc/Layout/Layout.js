import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Content = styled.main`
  margin-top: 72px;
`;

class Layout extends Component {
  constructor(props) {
    super(props);
    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this);
    this.sideDrawerToggleHandler = this.sideDrawerToggleHandler.bind(this);
    this.state = {
      showSideDrawer: false,
    };
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler() {
    this.setState(prevState => (
      { showSideDrawer: !prevState.showSideDrawer }
    ));
  }

  render() {
    const { children, isAuthenticated } = this.props;
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar
          isAuth={isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={isAuthenticated}
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
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

export default connect(mapStateToProps)(Layout);

/* eslint react/prop-types: "off" */
