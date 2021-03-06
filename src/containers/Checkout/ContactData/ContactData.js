import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

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
            minLength: 3,
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
            isEmail: true,
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
            minLength: 3,
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
            isNumeric: true,
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
            minLength: 3,
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
    };
  }

  orderHandler(event) {
    event.preventDefault();
    const { orderForm } = this.state;
    const {
      ings: ingredients, onOrderBurger, price, token, userId,
    } = this.props;
    const formData = {};
    Object.keys(orderForm).forEach((input) => {
      formData[input] = orderForm[input].value;
    });
    const order = {
      ingredients,
      price,
      userId,
      orderData: formData,
    };
    onOrderBurger(order, token);
  }

  inputChangedHandler(event, inputIdentifier) {
    const { orderForm } = this.state;
    const { target: { value: inputValue } } = event;
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: inputValue,
      valid: checkValidity(inputValue, orderForm[inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });
    let formIsValid = true;
    Object.keys(updatedOrderForm).forEach((input) => {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    });
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;
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
          clicked={() => {} /* For Props validation */}
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

ContactData.defaultProps = {
  token: null,
};

ContactData.propTypes = {
  ings: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  onOrderBurger: PropTypes.func.isRequired,
  token: PropTypes.string,
  userId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
