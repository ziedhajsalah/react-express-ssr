import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.initialData);

const Root = ({ store }) => (
  <Router>
    <App store={store} />
  </Router>
);

ReactDOM.hydrate(<Root store={store} />, document.getElementById('root'));
