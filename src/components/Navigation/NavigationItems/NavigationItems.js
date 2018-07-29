import React from "react";
import styled from 'styled-components';
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

function navigationItems() {
  return (
    <NavigationItems>
      <NavigationItem
        active
        link="#"
      >
        Burger Builder
      </NavigationItem>
      <NavigationItem
        active={false}
        link="#"
      >
        Checkout
      </NavigationItem>
    </NavigationItems>
  );
}

export default navigationItems;
