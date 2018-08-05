import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import SpinnerWithMargin from '../../components/UI/Spinner/SpinnerWithMargin';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('orders.json')
      .then((response) => {
        const { data } = response;
        const fetchedOrders = [];
        Object.keys(data).forEach((key) => {
          fetchedOrders.push({
            ...data[key],
            id: key,
          });
        });
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, orders } = this.state;
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

export default withErrorHandler(Orders, axios);
