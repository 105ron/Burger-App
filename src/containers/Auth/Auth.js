import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Aux from '../../hoc/Aux/Aux';
import SpinnerWithMargin from '../../components/UI/Spinner/SpinnerWithMargin';
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

const ErrorTag = styled.p`
  margin: 0
  color: red;
  text-transform: lowercase;
  text-align: center
`;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.inputChangedHandler = this.inputChangedHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.switchAuthModeHandler = this.switchAuthModeHandler.bind(this);
    this.state = {
      controls: {
        email: {
          elementType: 'input',
          label: 'Email',
          elementConfig: {
            type: 'email',
            placeholder: 'Email address',
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
      isSignUp: true,
    };
  }

  componentDidMount() {
    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = this.props;
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
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
      isSignUp,
      controls:
        {
          email: { value: emailValue },
          password: { value: passwordValue },
        },
    } = this.state;
    onAuth(emailValue, passwordValue, isSignUp);
  }

  switchAuthModeHandler(event) {
    event.preventDefault();
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  }

  render() {
    const { controls, formIsValid, isSignUp } = this.state;
    const {
      authRedirectPath, isAuthenticated, loading, error,
    } = this.props;
    const formElementsArray = [];
    Object.keys(controls).forEach(key => (
      formElementsArray.push(
        {
          id: key,
          config: controls[key],
        },
      )
    ));
    let errorMessage = null;
    if (error) {
      errorMessage = (
        <ErrorTag>
          {error}
        </ErrorTag>
      );
    }
    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={authRedirectPath} />;
    }
    const switchAuthButtonLabel = `${isSignUp ? 'Sign in' : 'Sign up'} Instead`;
    const submitButtonLabel = isSignUp ? 'Sign up' : 'Sign in';
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
    let renderComponent = (
      <AuthWrapper>
        <form onSubmit={this.submitHandler}>
          {form}
          {errorMessage}
          <Button
            btnType="success"
            clicked={() => {} /* For Props validation */}
            disabled={!formIsValid}
          >
            {submitButtonLabel}
          </Button>
          <Button
            btnType="danger"
            clicked={this.switchAuthModeHandler}
            disabled={false}
          >
            {switchAuthButtonLabel}
          </Button>
        </form>
      </AuthWrapper>
    );
    if (loading) renderComponent = <SpinnerWithMargin />;
    return (
      <Aux>
        {authRedirect}
        {renderComponent}
      </Aux>
    );
  }
}

Auth.propTypes = {
  authRedirectPath: PropTypes.string.isRequired,
  buildingBurger: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  onAuth: PropTypes.func.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authRedirectPath: state.auth.authRedirect,
    buildingBurger: state.burgerBuilder.building,
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading,
    error: state.auth.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

/* eslint class-methods-use-this: 'off', max-len: "off", arrow-body-style: "off" */
