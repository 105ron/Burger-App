import React from 'react';
import styled from 'styled-components';
import burgerLogo from '../../assets/images/burger-logo.png';

const Wrapper = styled.div`
  background-color: white;
  padding: 8px;
  height: 80%
  box-sizing: border-box;
  border-radius: 5px;
`;

const Logo = styled.img`
  height: 100%;
`;

function logo() {
  return (
    <Wrapper>
      <Logo src={burgerLogo} alt="Rhys's amazing Burgers" />
    </Wrapper>
  );
}

export default logo;
