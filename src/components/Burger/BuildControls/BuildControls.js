import React from "react";
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = styled.div`
  width: 100%;
  background-color: #cf8f2e;
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 0 2px 1px #ccc;
  margin: auto;
  padding: 10px 0;
`;
const enable = keyframes`
  0% {transform: scale(1)}
  60% {transform: scale(1.1)}
  100% {transform: scale(1);}
`;

const BuildButton = styled.button`
  background-color: #DAD735;
  outline: none;
  cursor: pointer;
  border: 1px solid #966909;
  color: #966909;
  font-family: inherit;
  font-size: 1.2em;
  padding: 15px 30px;
  box-shadow: 2px 2px 2px #966909;
  &:hover, &:active {
    background-color: #A0DB41;
    border: 1px solid #966909;
    color: #966909;
  }
  &:disabled {
    background-color: #C7C6C6;
    cursor: not-allowed;
    border: 1px solid #ccc;
    color: #888888;
  }
  &:not(:disabled) {
    animation: ${enable} 0.3s linear;
  }
`;

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

function buildControls(props) {
  const {
    ingredientAdded,
    ingredientRemoved,
    disabled,
    price,
    purchaseable,
  } = props;
  return (
    <BuildControls>
      <p>
        Current Price&#58;&nbsp;
        <strong>
          $
          {price.toFixed(2)}
        </strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <BuildButton
        disabled={!purchaseable}
      >
        BUILD
      </BuildButton>
    </BuildControls>
  );
}

buildControls.propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchaseable: PropTypes.bool.isRequired,
};

export default buildControls;
