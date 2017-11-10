import express from 'express';
import config from 'config';
import serverRender from 'renderers/server';
import { data } from './testData';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/data', (req, res) => {
  res.send(data);
});

app.get('/*', async (req, res) => {
  try {
    const initialContent = await serverRender(req);
    res.render('index', { ...initialContent });
  } catch (e) {
    res.send(e.stack);
  }
});

app.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}`);
});
