import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';
import globalCSS from './globalStyle/globalCss';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`${globalCSS}`;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/* eslint no-undef: "off", no-unused-expressions: "off" */
