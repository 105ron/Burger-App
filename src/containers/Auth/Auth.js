import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

const AuthWrapper = styled.div`
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

class Auth extends Component {
  constructor(props) {
    super(props);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          label: 'Email',
          elementConfig: {
            type: 'email',
            placeholder: 'Mail Address',
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          valid: false,
          touched: false,
        },
        password: {
          elementType: 'password',
          label: 'Password',
          elementConfig: {
            type: 'password',
            placeholder: 'Password',
          },
          value: '',
          validation: {
            required: true,
            minLength: 6,
          },
          valid: false,
          touched: false,
        },
      },
      formIsValid: false,
    };
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
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputChangedHandler(event, inputIdentifier) {
    const { controls } = this.state;
    const updatedControls = { ...controls };
    const updatedControlElement = { ...updatedControls[inputIdentifier] };
    updatedControlElement.value = event.target.value;
    updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation);
    updatedControlElement.touched = true;
    updatedControls[inputIdentifier] = updatedControlElement;
    let formIsValid = true;
    Object.keys(updatedControls).forEach((input) => {
      formIsValid = updatedControls[input].valid && formIsValid;
    });
    this.setState({ controls: updatedControls, formIsValid });
  }

  submitHandler(event) {
    event.preventDefault();
    const { onAuth } = this.props;
    const {
      controls:
        {
          email: { value: emailValue },
          password: { value: passwordValue },
        },
    } = this.state;
    console.log({ emailValue, passwordValue });
    onAuth(emailValue, passwordValue);
  }

  render() {
    const { controls, formIsValid } = this.state;
    const formElementsArray = [];
    Object.keys(controls).forEach(key => (
      formElementsArray.push(
        {
          id: key,
          config: controls[key],
        },
      )
    ));
    const form = (
      formElementsArray.map((formElement) => {
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
      })
    );
    return (
      <AuthWrapper>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            btnType="success"
            clicked={() => {} /* For Props validation */}
            disabled={false} /* fix later */
          >
            Submit
          </Button>
        </form>
      </AuthWrapper>
    );
  }
}

Auth.propTypes = {
  onAuth: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);

/* eslint class-methods-use-this: 'off', max-len: "off" */
