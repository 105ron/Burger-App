import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import burgerLogo from '../../assets/images/burger-logo.png';

const Wrapper = styled.div`
  background-color: white;
  padding: 8px;
  height: ${props => props.height};
  box-sizing: border-box;
  border-radius: 5px;
`;

const Logo = styled.img`
  height: 100%;
`;

function logo(props) {
  const { height } = props;
  return (
    <Wrapper height={height}>
      <Logo
        src={burgerLogo}
        alt="Rhys's amazing Burgers"
      />
    </Wrapper>
  );
}

logo.propTypes = {
  height: PropTypes.string.isRequired,
};

export default logo;

/* eslint react/destructuring-assignment: "off" */
