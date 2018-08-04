import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.orderHandler = this.orderHandler.bind(this);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          label: 'Name',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
          },
          value: '',
        },
        email: {
          elementType: 'input',
          label: 'Email',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email',
          },
          value: '',
        },
        street: {
          elementType: 'input',
          label: 'Street',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street',
          },
          value: '',
        },
        postCode: {
          elementType: 'input',
          label: 'Post Code',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Post Code',
          },
          value: '',
        },
        country: {
          elementType: 'input',
          label: 'Country',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
          },
          value: '',
        },
        deliveryMethod: {
          elementType: 'select',
          label: 'Delivery Method',
          elementConfig: {
            options: [
              { value: 'fastest', displayValue: 'Fastest' },
              { value: 'slowest', displayValue: 'Slowest' },
            ],
          },
          value: '',
        },
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
    axios.post('orders.json', order)
      .then((response) => {
        const { history } = this.props;
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  }

  render() {
    const { loading, orderForm } = this.state;
    const formElementsArray = [];
    Object.keys(orderForm).forEach(key => (
      formElementsArray.push(
        {
          id: key,
          config: orderForm[key],
        },
      )
    ));
    let form = (
      <form>
        {formElementsArray.map((formElement) => {
          const {
            elementType, elementConfig, label, value,
          } = formElement.config;
          return (
            <Input
              elementType={elementType}
              elementConfig={elementConfig}
              key={formElement.id}
              label={label}
              value={value}
            />
          );
        })}
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
