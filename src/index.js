import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
import App from './App';
import globalCSS from './globalStyle/globalCss';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);

injectGlobal`${globalCSS}`;

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

/* eslint no-undef: "off", no-unused-expressions: "off" */
