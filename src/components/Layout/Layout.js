import React from 'react';
import styled from 'styled-components';
import Aux from '../../hoc/Aux';

const Content = styled.main`
  margin-top: 16px;
`;

function layout(props) {
  const { children } = props;
  return (
    <Aux>
      <div>
        Toolbar, SideDrawer, Backdrop
      </div>
      <Content>
        {children}
      </Content>
    </Aux>
  );
}

export default layout;
