import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

const Contact = styled.div`
  margin: 20px auto;
  width: 80%;
  text-align: centre;
  box-shadow: 0 2px 3px #ccc;
  border: 1px solid #eee;
  padding: 10px;
  box-sizing: border-box;
  @media (min-width: 600px) {
    width: 500px;
  }
`;

const Input = styled.input`
  display: block;
`;

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.orderHandler = this.orderHandler.bind(this);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false,
    };
  }

  orderHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { ingredients, price } = this.props;
    const order = {
      ingredients,
      price,
      address: {
        street: '145 Evergreen Tce',
        zipcode: '12345',
        country: 'USA',
      },
      email: 'test@test.com',
      deliveryMethod: 'mostEconomical',
    };
    axios.post('order.json', order)
      .then((response) => {
        const { history } = this.props;
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <Input type="text" name="name" placeholder="Your name" />
        <Input type="email" name="email" placeholder="Your email" />
        <Input type="text" name="postalCode" placeholder="Your postal code" />
        <Input type="text" name="street" placeholder="Your Street" />
        <Button
          btnType="success"
          clicked={this.orderHandler}
        >
          Order
        </Button>
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <Contact>
        <h4>
          Enter your contact data
        </h4>
        {form}
      </Contact>
    );
  }
}

ContactData.propTypes = {
  price: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  ingredients: PropTypes.object.isRequired,
};

export default ContactData;
