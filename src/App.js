import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as actions from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignUp } = this.props;
    onTryAutoSignUp();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

App.propTypes = {
  onTryAutoSignUp: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
}

export default withRouter(connect(null, mapDispatchToProps)(App));

/* eslint react/prefer-stateless-function: "off" */
