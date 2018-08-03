import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
    this.state = {
      ingredients: {
        bacon: 0,
        salad: 0,
        meat: 0,
        cheese: 0,
      },
    };
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    const query = new URLSearchParams(search);
    const ingredients = {};
    query.forEach((amount, ingredient) => {
      ingredients[ingredient] = +amount;
    });
    this.setState({ ingredients });
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
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Checkout;
