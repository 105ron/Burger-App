import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const Summary = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
`;

const BurgerContainer = styled.div`
  width: 100%;
  margin: auto;
`;

function checkoutSummary(props) {
  const { ingredients, checkoutContinued, checkoutCancelled } = props;
  return (
    <Summary>
      <h1>
        It will taste amazing!
      </h1>
      <BurgerContainer>
        <Burger ingredients={ingredients} />
      </BurgerContainer>
      <Button
        clicked={checkoutCancelled}
        btnType="danger"
      >
        Cancel
      </Button>
      <Button
        clicked={checkoutContinued}
        btnType="success"
      >
        Continue
      </Button>
    </Summary>
  );
}
checkoutSummary.propTypes ={
  ingredients: PropTypes.object.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
  checkoutCancelled: PropTypes.func.isRequired,
};

export default checkoutSummary;
