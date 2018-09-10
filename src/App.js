import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(function() {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(function() {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(function() {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignUp } = this.props;
    onTryAutoSignUp();
  }

  render() {
    const { isAuthenticated } = this.props;
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onTryAutoSignUp: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.token !== null,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

/* eslint react/prefer-stateless-function: "off" */
