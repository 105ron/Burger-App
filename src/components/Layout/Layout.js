import React from 'react';
import Aux from '../../hoc/Aux';

function layout(props) {
  const { children } = props;
  return (
    <Aux>
      <div>
        Toolbar, SideDrawer, Backdrop
      </div>
      <main>
        {children}
      </main>
    </Aux>
  );
}

export default layout;
