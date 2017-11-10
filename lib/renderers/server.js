import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import axios from 'axios';
import App from 'components/App';
import StateApi from 'state-api';
import config from 'config';

const serverRender = async (req) => {
  const res = await axios.get(`http://${config.host}:${config.port}/data`);
  const store = new StateApi(res.data);
  const context = {};

  const Root = ({ store }) => (
    <StaticRouter location={req.url} context={context}>
      <App store={store} />
    </StaticRouter>
  );

  return {
    initialMarkup: ReactDOMServer.renderToString(<Root store={store} />),
    initialData: res.data,
  };
};

export default serverRender;
