import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/spinner/spinner';

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
    this.purchaseContinued = this.purchaseContinued.bind(this);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchaseable: false,
      purchasing: false,
      loading: false,
    };
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

  purchaseContinued() {
    this.setState({ loading: true });
    const { ingredients, totalPrice: price } = this.state;
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
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => this.setState({ loading: false, purchasing: false }));
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
      ingredients,
      totalPrice,
      loading,
      purchaseable,
      purchasing,
    } = this.state;
    let orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinued}
      />
    );
    if (loading) {
      orderSummary = <Spinner />;
    }
    const disabledInfo = { ...ingredients };
    new Map(Object.entries(ingredients)).forEach((value, key) => {
      disabledInfo[key] = !value;
    });
    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
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
  }
}

export default withErrorHandler(BurgerBuilder);
