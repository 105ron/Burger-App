import React from 'react';
import PropType from 'prop-types';
import styled from 'styled-components';

const Order = styled.div`
  width: 80%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

const Ingredient = styled.span`
  text-transform: capitalize;
  display: inline-block;
  margin: 0 8px;
  border: 1px solid #ccc;
  padding: 5px;
`;

function order(props) {
  const { ingredients, price } = props;
  const ingredientsArray = [];
  Object.keys(ingredients).forEach((key, value) => {
    ingredientsArray.push(
      {
        name: key,
        amount: value,
      },
    );
  });
  const ingredientOutput = ingredientsArray.map(ig => (
    <Ingredient key={ig.name}>
      {ig.name}
      &nbsp;(
      {ig.amount}
      )
    </Ingredient>
  ));
  return (
    <Order>
      <p>
        Ingredients&#58;
        {ingredientOutput}
      </p>
      <p>
        Price&#58;&nbsp;
        <strong>
          $
          {price.toFixed(2)}
        </strong>
      </p>
    </Order>
  );
}

order.propTypes = {
  price: PropType.number.isRequired,
  ingredients: PropType.object.isRequired,
};

export default order;
