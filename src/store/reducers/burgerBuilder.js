import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
  ingredients: {},
  error: false,
  totalPrice: 4,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

function addIngredient(state, action) {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const ingredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients,
    building: true,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
}

function removeIngredient(state, action) {
  const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const ingredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients,
    building: true,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
}

function setIngredients(state, action) {
  return updateObject(
    state,
    {
      error: false,
      ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat,
      },
      totalPrice: 4,
      building: false,
    },
  );
}

function fetchIngredientsFailed(state) {
  return updateObject(state, { error: true });
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
}

export default reducer;
