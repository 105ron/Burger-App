import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

export function setIngredients(ingredients) {
  return {
    ingredients,
    type: actionTypes.SET_INGREDIENTS,
  };
}

export function fetchIngredientsFailed() {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
}

export function initIngredients() {
  return (dispatch) => {
    axios.get('ingredients.json')
      .then(response => dispatch(setIngredients(response.data)))
      .catch(error => dispatch(fetchIngredientsFailed()));
  };
}
