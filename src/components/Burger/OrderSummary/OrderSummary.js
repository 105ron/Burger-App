import React from "react";
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

function orderSummary(props) {
  const {
    ingredients,
    price,
    purchaseCancelled,
    purchaseContinued,
  } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map(igKey => (
      ingredients[igKey] ? (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>
            {igKey}
          </span>
          &#58;&nbsp;
          {ingredients[igKey]}
        </li>
      ) : null
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
        <strong>
          Total Price&#58;&nbsp;
        </strong>
        $
        {price.toFixed(2)}
      </p>
      <p>
        Continue to Checkout?
      </p>
      <Button
        btnType="danger"
        clicked={purchaseCancelled}
      >
        Cancel
      </Button>
      <Button
        btnType="success"
        clicked={purchaseContinued}
      >
        Submit
      </Button>
    </Aux>
  );
}

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchaseContinued: PropTypes.func.isRequired,
  purchaseCancelled: PropTypes.func.isRequired,
};

export default orderSummary;
