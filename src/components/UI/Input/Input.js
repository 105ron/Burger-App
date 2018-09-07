import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Input = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 3px;
`;
const InputElement = styled.input`
  outline: none;
  border: 1px solid #ccc;
  background-color: white;
  ${props => props.invalid 
    && `border: 1px solid red;
    background-color: #fda49a;`}
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

const Select = InputElement.withComponent('select');

function input(props) {
  const {
    elementType, label, value, elementConfig, changed, invalid,
  } = props;
  let inputElement = null;
  switch (elementType) {
    case ('input'):
      inputElement = <InputElement onChange={changed} value={value} {...elementConfig} invalid={invalid} />;
      break;
    case ('textarea'):
      inputElement = <TextArea onChange={changed} value={value} {...elementConfig} invalid={invalid} />;
      break;
    case ('select'):
      inputElement = (
        <Select onChange={changed} value={value} invalid={invalid}>
          {elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayName}
            </option>
          ))}
        </Select>
      );
      break;
    default:
      inputElement = <InputElement onChange={changed} value={value} {...elementConfig} invalid={invalid} />;
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
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default input;
