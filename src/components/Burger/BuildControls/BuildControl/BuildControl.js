import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BuildControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items; center;
  margin:5px 0;
`;

const Label = styled.div`
  padding: 10px;
  font-weight: bold;
  width: 80px;
`;


const LessButton = styled.button`
  display: block;
  font: inherit;
  padding: 5px;
  margin: 0 5px;
  width: 80px;
  border: 1px solid #aa6817;
  cursor: pointer;
  outline: none;
  background-color: #D39952;
  color: white;
  &:hover, &:active {  
    background-color: #DAA972;
    color: white;
  }
  &:disabled {
    background-color: #AC9980;
    border: 1px solid #7E7365;
    color: #ccc;
    cursor: default;
  }
  &:hover:disabled {
    background-color: #AC9980;
    color: #ccc;
    cursor: not-allowed;
  }
`;

const MoreButton = LessButton.extend` 
  background-color: #8F5E1E;
  color: white;
  &:hover, &:active {
    background-color: #99703F;
    color: white;
  }
`;

function buildControl(props) {
  const {
    label, added, removed, disabled,
  } = props;
  return (
    <BuildControl>
      <Label>
        {label}
      </Label>
      <MoreButton onClick={added}>
        More
      </MoreButton>
      <LessButton
        onClick={removed}
        disabled={disabled}
      >
        Less
      </LessButton>
    </BuildControl>
  );
}

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default buildControl;
