import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const Ingredient = styled.li`
  list-style: none;
`;

const IngredientName = styled.span`
  text-transform: capitalize;
`;

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
        <Ingredient key={igKey}>
          <IngredientName>
            {igKey}
          </IngredientName>
          &#58;&nbsp;
          {ingredients[igKey]}
        </Ingredient>
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
