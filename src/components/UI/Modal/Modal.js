import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 500;
  text-align: center;
  background-color: white;
  width: 70%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px black;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-120vh)'};
  opacity: ${props => props.show ? '1' : '0'};
  transition: all 0.3s ease-out;
  @media (min-width: 600px) {
    width: 500px;
    left: calc(50% - 250px);
  }
`;

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { show, children } = this.props;
    return (nextProps.show !== show) || (nextProps.children !== children);
  }

  render() {
    const { children, show, modalClosed } = this.props;
    return (
      <Aux>
        <Backdrop
          show={show}
          click={modalClosed}
        />
        <ModalWrapper show={show}>
          {children}
        </ModalWrapper>
      </Aux>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

export default Modal;

/* eslint no-confusing-arrow: "off", react/destructuring-assignment: "off" */
