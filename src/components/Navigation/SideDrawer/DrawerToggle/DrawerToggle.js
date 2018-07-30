import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DrawerToggle = styled.div`
  width: 40px;
  height: 100%;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  box-sizing: border-box;
  cursor: pointer;
  & > div {
    width: 90%;
    height: 3px;
    background-color: white;
  }
  @media (min-width: 500px) {
    display: none;
  }
`;

function drawerToggle(props) {
  const { clicked } = props;
  return (
    <DrawerToggle onClick={clicked}>
      <div />
      <div />
      <div />
    </DrawerToggle>
  );
}

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default drawerToggle;
