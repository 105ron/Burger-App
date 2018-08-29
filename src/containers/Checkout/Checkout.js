import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
  }

  checkoutCancelledHandler() {
    const { history } = this.props;
    history.goBack();
  }

  checkoutContinuedHandler() {
    const { history } = this.props;
    history.replace("/checkout/contact-data");
  }

  render() {
    const { ings: ingredients, match, purchased } = this.props;
    let summary = null;
    if (ingredients.salad >= 0) {
      const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ingredients}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled={this.checkoutCancelledHandler}
          />
          <Route
            path={`${match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  ings: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  purchased: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.orders.purchased,
  };
}

export default connect(mapStateToProps)(Checkout);
