import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = styled.div`
  width: 100%;
  margin: auto;
  height: 250px;
  overflow: scroll;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  @media (min-width: 500px) and (min-height: 400px) {
    width: 350px;
    height: 300px;
  }
  @media (min-width: 500px) and (min-height: 401px) {
    width: 450px;
    height: 400px;
  }
  @media (min-width: 1000px) and (min-height: 700px) {
    width: 700px;
    height: 450px;
  }
`;

function burger(props) {
  const { ingredients } = props;
  let transformedIngredients = Object.keys(ingredients).map(igKey => (
    [...Array(ingredients[igKey])].map((_, i) => (
      <BurgerIngredient key={igKey + i} type={igKey} />
    ))
  )).reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p>
        Please start  adding ingredients
      </p>
    );
  }
  return (
    <Burger>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </Burger>
  );
}

burger.propTypes ={
  ingredients: PropTypes.object.isRequired,
};

export default burger;

/* eslint react/no-array-index-key: "off" */
