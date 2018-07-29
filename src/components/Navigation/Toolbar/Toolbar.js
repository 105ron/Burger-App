import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../../Logo/Logo';
import NavigationItems from "../NavigationItems/NavigationItems";

const Toolbar = styled.header`
  height: 56px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #703b09;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 90;
`;

const Nav = styled.nav`
  height: 100%;
  @media (max-width: 499px) {
    display: none;
  }
`;

function toolbar(props) {
  return (
    <Toolbar>
      <div>
        Menu
      </div>
      <Logo height="80%" />
      <Nav>
        <NavigationItems />
      </Nav>
    </Toolbar>
  );
}

export default toolbar;