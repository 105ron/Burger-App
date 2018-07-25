import React from 'react';
import Aux from '../../hoc/Aux';
import styled from 'styled-components';

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
