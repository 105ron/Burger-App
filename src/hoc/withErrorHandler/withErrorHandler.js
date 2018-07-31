import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Aux from '../Aux/Aux';

function withErrorHandler(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
      this.state = {
        error: false,
        message: null,
      };
    }

    componentDidMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: false, message: null });
        return req;
      });
      axios.interceptors.response.use(res => res, error => (
        this.setState({ error: true, message: error.message })));
    }

    errorConfirmedHandler() {
      this.setState({ error: false, message: null });
    }

    render() {
      const { error, message } = this.state;
      const { props } = this;
      return (
        <Aux>
          <Modal
            show={error}
            modalClosed={this.errorConfirmedHandler}
          >
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
              {message}
            </p>
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      );
    }
  };
}

export default withErrorHandler;
