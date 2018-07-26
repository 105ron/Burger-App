import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
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
  }

  render() {
    const { ingredients } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
