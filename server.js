const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const webpackConfig = require('./webpack.config.js');
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');

  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(express.static('dist'));
}

app.set('port', process.env.PORT || 8080);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});
