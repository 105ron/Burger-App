import React from 'react';
import styled from 'styled-components';

const Order = styled.div`
  width: 100%;
  border: 1px solid #eee;
  box-shadow: 0 2px 3px #ccc;
  padding: 10px;
  margin: 10px auto;
  box-sizing: border-box;
`;

function order(props) {
  return (
    <Order>
      <p>
        Ingredients&#58; Salad(1)
      </p>
      <p>
        Price&#58;
        <strong>
          USD $5.45
        </strong>
      </p>
    </Order>
  );
}

export default order;
