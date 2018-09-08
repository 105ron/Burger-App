import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Order from '../../components/Order/Order';
import SpinnerWithMargin from '../../components/UI/Spinner/SpinnerWithMargin';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    const { onFetchOrders, token, userId } = this.props;
    onFetchOrders(token, userId);
  }

  render() {
    const { loading, orders } = this.props;
    let orderDisplay = <SpinnerWithMargin />;
    if (!loading) {
      orderDisplay = (
        orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))
      );
    }

    return (
      <div>
        {orderDisplay}
      </div>
    );
  }
}

Orders.defaultProps = {
  token: null,
};

Orders.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired,
  onFetchOrders: PropTypes.func.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
  };
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
