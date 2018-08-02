import React, { Component } from 'react';
import styled from 'styled-components';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        bacon: 1,
        salad: 1,
        meat: 1,
        cheese: 1,
      },
    };
  }

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary ingredients={ingredients} />
      </div>
    );
  }
}

export default Checkout;
