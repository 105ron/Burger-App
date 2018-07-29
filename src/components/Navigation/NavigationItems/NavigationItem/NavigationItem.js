import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NavigationItem = styled.li`
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%
  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
  }
`;

const activeStyles = `
  background-color: #8f5c2c;
  border-bottom: 4px solid #40a4c8;
  color: white;
`;

const Link = styled.a`
  color: #8f5cec;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  display: block
  ${props => props.active && 'color: #40a4c8;'}
  &:hover, &:active {
    color: #40a4c8
  }
  @media (min-width: 500px) {
    color: white;
    height: 100%;
    padding: 16px 10px;
    border-bottom: 4px solid transparent;
    ${props => props.active && `${activeStyles}`}
    &:hover, &:active {
      ${activeStyles}
    }
  }
`;

function navigationItem(props) {
  const { active, children, link } = props;
  return (
    <NavigationItem>
      <Link
        active={active}
        href={link}
      >
        {children}
      </Link>
    </NavigationItem>
  );
}

navigationItem.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default navigationItem;
