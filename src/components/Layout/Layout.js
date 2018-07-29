import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Content = styled.main`
  margin-top: 72px;
`;

function layout(props) {
  const { children } = props;
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <Content>
        {children}
      </Content>
    </Aux>
  );
}

layout.propTypes = {
  children: PropTypes.object.isRequired,
};

export default layout;
