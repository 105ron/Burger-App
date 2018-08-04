import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.div`
  width:100%;
  padding: 10px;
  box-sizing: border-box;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
`;
const InputElement = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-colo: white;
  font: inherit;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none
    background-color: #ccc
  }
`;

const TextArea = InputElement.withComponent('textarea');

function input(props) {
  const { elementType, label, value, elementConfig, } = props;
  let inputElement = null;
  switch (elementType) {
    case ('input'):
      inputElement = <InputElement {...elementConfig} value={value} />;
      break;
    case ('textarea'):
      inputElement = <TextArea {...elementConfig} value={value} />;
      break;
    default:
      inputElement = <InputElement {...elementConfig} value={value} />;
  }
  return (
    <Input>
      <Label>
        {label}
      </Label>
      {inputElement}
    </Input>
  );
}

input.propTypes = {
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default input;
