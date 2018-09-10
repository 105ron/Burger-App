import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import SpinnerWithMargin from '../../components/UI/Spinner/SpinnerWithMargin';

export class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
    this.state = {
      purchasing: false,
    };
  }

  componentDidMount() {
    const { onInitIngredients } = this.props;
    onInitIngredients();
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { history, onInitPurchase } = this.props;
    onInitPurchase();
    history.push("/checkout");
  }

  purchaseHandler() {
    const { history, isAuthenticated, onSetAuthRedirectPath } = this.props;
    if (isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      onSetAuthRedirectPath('/checkout');
      history.push('/auth');
    }
  }

  updatePurchaseState() {
    const { ings: ingredients } = this.props;
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((total, el) => total + el, 0);
    return sum > 0;
  }

  render() {
    const { purchasing } = this.state;
    const {
      error, ings: ingredients, isAuthenticated, onIngredientAdded, onIngredientRemoved, price: totalPrice,
    } = this.props;
    let orderSummary = null;
    let modal = null;
    let burger = error ? (
      <p>
        Application can&#39;t be loaded
      </p>
    )
      : (
        <SpinnerWithMargin />
      );
    const disabledInfo = { ...ingredients };
    if (ingredients.salad >= 0) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            ordered={this.purchaseHandler}
            price={totalPrice}
            purchaseable={this.updatePurchaseState()}
            isAuth={isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          price={totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
        />
      );
      // if (loading) {
      //   orderSummary = <SpinnerWithMargin />;
      // }
      new Map(Object.entries(ingredients)).forEach((value, key) => {
        disabledInfo[key] = !value;
      });
      modal = (
        <Modal
          show={purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
      );
    }
    return (
      <Aux>
        {burger}
        {modal}
      </Aux>
    );
  }
}

BurgerBuilder.propTypes = {
  error: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  ings: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onSetAuthRedirectPath: PropTypes.func.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  onInitIngredients: PropTypes.func.isRequired,
  onInitPurchase: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    ings: state.burgerBuilder.ingredients,
    isAuthenticated: state.auth.token !== null,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIngredientAdded: ingredientName => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: ingredientName => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

/* eslint class-methods-use-this: "off" */
