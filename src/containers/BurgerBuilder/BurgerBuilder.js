import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    this.purchaseCancelHandler = this.purchaseCancelHandler.bind(this);
    this.purchaseContinuedHandler = this.purchaseContinuedHandler.bind(this);
    this.state = {
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    axios.get('ingredients.json')
      .then(response => this.setState({ ingredients: response.data }))
      .catch(error => this.setState({ error: true }));
  }

  addIngredientHandler(type) {
    const { ingredients } = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    ingredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const { totalPrice: oldPrice } = this.state;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients });
    this.updatePurchaseState(ingredients);
  }

  purchaseCancelHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinuedHandler() {
    const { history } = this.props;
    const { ingredients, totalPrice } = this.state;
    const queryString =Object.keys(ingredients).reduce((accum, key) => (
      `${accum}${encodeURIComponent(key)}=${encodeURIComponent(ingredients[key])}&`),
    `price=${encodeURIComponent(totalPrice.toFixed(2))}&`)
      .slice(0, -1);
    history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  removeIngredientHandler(type) {
    const { ingredients } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    ingredients[type] = updatedCount;
    const priceSubtraction = INGREDIENT_PRICES[type];
    const { totalPrice: oldPrice } = this.state;
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ totalPrice: newPrice, ingredients });
    this.updatePurchaseState(ingredients);
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((total, el) => total + el, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  render() {
    const {
      error,
      ingredients,
      totalPrice,
      loading,
      purchaseable,
      purchasing,
    } = this.state;
    let orderSummary = null;
    let modal = null;
    let burger = error ? (
      <p>
        Application can&#39;t be loaded
      </p>
    )
      : (
        <div style={{ marginTop: '200px' }}>
          <Spinner />
        </div>
      );
    const disabledInfo = { ...ingredients };
    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            ordered={this.purchaseHandler}
            price={totalPrice}
            purchaseable={purchaseable}
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
        orderSummary = <Spinner />;
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
};

export default withErrorHandler(BurgerBuilder, axios);
