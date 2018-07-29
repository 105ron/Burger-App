import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

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
  transform: ${props => props.show ? 'translateX(0);' : 'translateX(-100%);'}
  transition: transform 0.3s ease-out;
  @media (min-width: 500px) {
    display: none;
  }
`;

const NavBar = styled.nav`
  margin-top: 32px;
`;

function sideDrawer(props) {
  const { closed, open } = props;
  return (
    <Aux>
      <Backdrop show={open} click={closed} />
      <SideDrawer show={open} style={open ? null : { transform: 'translateX(-100%)' }}>
        <Logo height="11%" />
        <NavBar>
          <NavigationItems />
        </NavBar>
      </SideDrawer>
    </Aux>
  );
}

sideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default sideDrawer;

/* eslint no-confusing-arrow: "off", react/destructuring-assignment: "off" */
