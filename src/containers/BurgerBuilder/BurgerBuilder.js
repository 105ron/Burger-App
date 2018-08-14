import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actionTypes from '../../store/actions';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import SpinnerWithMargin from '../../components/UI/Spinner/SpinnerWithMargin';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
    this.state = {
      purchasing: false,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    // axios.get('ingredients.json')
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(error => this.setState({ error: true }));
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { history } = this.props;
    history.push("/checkout");
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  updatePurchaseState() {
    const { ings: ingredients } = this.props;
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((total, el) => total + el, 0);
    return sum > 0;
  }

  render() {
    const {
      error, loading, purchasing,
    } = this.state;
    const {
      ings: ingredients, onIngredientAdded, onIngredientRemoved, price: totalPrice,
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
    if (ingredients) {
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
      if (loading) {
        orderSummary = <SpinnerWithMargin />;
      }
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
  history: PropTypes.object.isRequired,
  ings: PropTypes.object.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onIngredientAdded: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
    onIngredientRemoved: ingredientName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

/* eslint class-methods-use-this: "off" */
