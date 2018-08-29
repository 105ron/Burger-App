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
    const { onFetchOrders } = this.props;
    onFetchOrders();
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

Orders.propTypes = {
  loading: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired,
  onFetchOrders: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
}

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
