import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export function purchaseBurgerSuccess(orderId, orderData) {
  return {
    orderData,
    orderId,
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
  };
}

export function purchaseBurgerFail(error) {
  return {
    error,
    type: actionTypes.PURCHASE_BURGER_FAIL,
  };
}

export function purchaseBurgerStart() {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
}

export function purchaseBurger(order) {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post('orders.json', order)
      .then((response) => {
        dispatchEvent(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch(error => dispatchEvent(purchaseBurgerFail(error)));
  };
}
