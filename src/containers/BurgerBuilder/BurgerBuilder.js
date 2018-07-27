import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
      purchaseable,
      purchasing,
    } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary ingredients={ingredients} />
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

export default BurgerBuilder;
