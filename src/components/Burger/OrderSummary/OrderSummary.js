import React from "react";
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux';

function orderSummary(props) {
  const { ingredients } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>
          {igKey}
        </span>
        &#58;&nbsp;
        {ingredients[igKey]}
      </li>
    ));

  return (
    <Aux>
      <h3>
        Your Order Summary
      </h3>
      <p>
        A delicious burger with the following ingredients&#58;
      </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>
        Continue to Checkout?
      </p>
    </Aux>
  );
}

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
};

export default orderSummary;
