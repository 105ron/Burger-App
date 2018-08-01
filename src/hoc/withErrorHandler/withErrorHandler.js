import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

function withErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.errorConfirmedHandler = this.errorConfirmedHandler.bind(this);
      this.state = {
        error: false,
        message: null,
      };
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: false, message: null });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => (
        this.setState({ error: true, message: error.message })));
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
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
