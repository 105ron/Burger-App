import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';


class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Build Controls</div>
        <BurgerIngredient type="bread-top"/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
