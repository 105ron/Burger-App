import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
    this.state = {
      ingredients: null,
      price: 0,
    };
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
    const { ingredients, price } = this.state;
    const { match } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={`${match.path}/contact-data`}
          render={props => (<ContactData ingredients={ingredients} price={price} {...props} />)}
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Checkout;
