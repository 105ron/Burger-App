import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  background-color: white;
  padding: 32px 16px;
  box-sizing: border-box;
  transform: ${props => props.open ? 'translateX(0);' : 'translateX(-100);'}
  transition: transform 03.s ease-out;
  @media (min-width: 500px) {
    display: none;
  }
`;

const NavBar = styled.nav`
  margin-top: 32px;
`;

function sideDrawer(props) {
  return (
    <SideDrawer>
      <Logo height="11%" />
      <NavBar>
        <NavigationItems />
      </NavBar>
    </SideDrawer>
  );
}

export default sideDrawer;

/* eslint no-confusing-arrow: "off", react/destructuring-assignment: "off" */
