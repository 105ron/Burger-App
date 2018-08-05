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
  text-align: center;
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
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
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
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: 'input',
          label: 'Email',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: 'input',
          label: 'Street',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Street',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        postCode: {
          elementType: 'input',
          label: 'Post Code',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Post Code',
          },
          value: '',
          validation: {
            required: true,
            minLength: 3,
            maxLength: 8,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: 'input',
          label: 'Country',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
          },
          value: '',
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        deliveryMethod: {
          elementType: 'select',
          label: 'Delivery Method',
          elementConfig: {
            options: [
              { value: 'fastest', displayName: 'Fastest' },
              { value: 'slowest', displayName: 'Slowest' },
            ],
          },
          value: 'fastest',
          valid: true,
          touched: true,
          validation: {},
        },
      },
      formIsValid: false,
      loading: false,
    };
  }

  orderHandler(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const { orderForm } = this.state;
    const { ingredients, price } = this.props;
    const formData = {};
    Object.keys(orderForm).forEach((input) => {
      formData[input] = orderForm[input].value;
    });
    const order = {
      ingredients,
      price,
      orderData: formData,
    };
    axios.post('orders.json', order)
      .then((response) => {
        const { history } = this.props;
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler(event, inputIdentifier) {
    const { orderForm } = this.state;
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach((input) => {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    });
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const { loading, orderForm, formIsValid } = this.state;
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
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          const {
            elementType, elementConfig, label, value, valid, validation, touched,
          } = formElement.config;
          return (
            <Input
              changed={event => this.inputChangedHandler(event, formElement.id)}
              elementType={elementType}
              elementConfig={elementConfig}
              invalid={!valid && validation && touched}
              key={formElement.id}
              label={label}
              value={value}
            />
          );
        })}
        <Button
          btnType="success"
          clicked={() => {}}
          disabled={!formIsValid}
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

/* eslint class-methods-use-this: 'off' */
