import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const COLORS = {
  success: '#5C9210',
  danger: '#944317',
};

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${props => COLORS[props.type] || 'white'};
  outline: none;
  cursor: pointer;
  font: inherit;
  padding: 10px;
  margin: 10px;
  font-weight: bold;
  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }
`;


function button(props) {
  const { children, clicked, btnType = "" } = props;
  return (
    <Button
      type={btnType}
      onClick={clicked}
    >
      {children}
    </Button>
  );
}

button.propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
};

export default button;

/* eslint react/destructuring-assignment: "off" */
