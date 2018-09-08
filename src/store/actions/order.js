import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export function purchaseBurgerSuccess(orderId, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderData,
    orderId,
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

export function purchaseBurger(order, token) {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios.post(`/orders.json?auth=${token}`, order)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, order));
      })
      .catch(error => dispatchEvent(purchaseBurgerFail(error)));
  };
}

export function purchaseInit() {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
}

export function fetchOrdersSucess(orders) {
  return {
    orders,
    type: actionTypes.FETCH_ORDERS_SUCCESS,
  };
}

export function fetchOrdersFail(error) {
  return {
    error,
    type: actionTypes.FETCH_ORDERS_FAIL,
  };
}

export function fetchOrdersStart() {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
}

export function fetchOrders(token, userId) {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    const queryParam = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios.get(`orders.json${queryParam}`)
      .then((response) => {
        const { data } = response;
        const fetchedOrders = [];
        Object.keys(data).forEach((key) => {
          fetchedOrders.push({
            ...data[key],
            id: key,
          });
        });
        dispatch(fetchOrdersSucess(fetchedOrders));
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error));
      });
  };
}
