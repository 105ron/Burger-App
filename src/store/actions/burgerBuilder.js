import * as actionTypes from './actionTypes';

export function addIngredient(ingredientName) {
  return {
    ingredientName,
    type: actionTypes.ADD_INGREDIENT,
  };
}

export function removeIngredient(ingredientName) {
  return {
    ingredientName,
    type: actionTypes.REMOVE_INGREDIENT,
  };
}
