import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Aux from '../../../hoc/Aux/Aux';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  flex-flow: column;
  height: 100%;
  @media (min-width: 500px) {
    flex-flow: row;
  }
`;

function navigationItems(props) {
  const { isAuth } = props;
  const protectedLinks = (
    <Aux>
      <NavigationItem
        link="/orders"
      >
        Orders
      </NavigationItem>
      <NavigationItem
        link="/logout"
      >
        Logout
      </NavigationItem>
    </Aux>
  );
  return (
    <NavigationItems>
      <NavigationItem
        link="/"
      >
        Burger Builder
      </NavigationItem>
      {isAuth ? (
        protectedLinks
      ) : (
        <NavigationItem
          link="/auth"
        >
          Sign up
        </NavigationItem>
      )}
    </NavigationItems>
  );
}

navigationItems.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default navigationItems;
