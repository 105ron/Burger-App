import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

function drawerToggle(props) {
  const { clicked } = props;
  return (
    <div onClick={clicked}>
      Menu
    </div>
  );
}

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default drawerToggle;
