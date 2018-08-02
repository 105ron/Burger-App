import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const Summary = styled.div`
  text-align: center;
  width: 80%;
  margin: auto;
  // @media (min-width: 600px) {
  //   width: 500px;
  // }
`;

const BurgerContainer = styled.div`
  width: 100%;
  margin: auto;
`;

function checkoutSummary(props) {
  const { ingredients } = props;
  return (
    <Summary>
      <h1>
        It will taste amazing!
      </h1>
      <BurgerContainer>
        <Burger ingredients={ingredients} />
      </BurgerContainer>
      <Button
        btnType="danger"
      >
        Cancel
      </Button>
      <Button
        btnType="success"
      >
        Continue
      </Button>
    </Summary>
  );
}
checkoutSummary.propTypes ={
  ingredients: PropTypes.object.isRequired,
};

export default checkoutSummary;
