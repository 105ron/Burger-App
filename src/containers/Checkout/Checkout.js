import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
  }

  componentWillMount() {
    const { location: { search } } = this.props;
    const query = new URLSearchParams(search);
    const ingredients = {};
    let price = 0;
    query.forEach((amount, ingredient) => {
      if (ingredient === "price") {
        price = +amount;
      } else {
        ingredients[ingredient] = +amount;
      }
    });
    this.setState({ ingredients, price });
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
    const { ings: ingredients, match } = this.props;
    return (
      <div>
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
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  ings: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ings: state.ingredients,
  };
}

export default connect(mapStateToProps)(Checkout);
